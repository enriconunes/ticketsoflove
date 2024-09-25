import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import Stripe from 'stripe'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

const MAX_TICKETS = 100
const BCRYPT_SALT = process.env.BCRYPT_SALT!

export async function POST(request: Request) {
  const { priceId, formData } = await request.json()

  try {
    // Validate input data
    if (typeof formData.from !== 'string' || formData.from.trim() === '') {
      throw new Error('Invalid "from" field')
    }
    if (typeof formData.to !== 'string' || formData.to.trim() === '') {
      throw new Error('Invalid "to" field')
    }
    if (typeof formData.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      throw new Error('Invalid email address')
    }
    if (typeof formData.message !== 'string') {
      throw new Error('Invalid description')
    }
    if (typeof formData.password !== 'string' || formData.password.length < 6) {
      throw new Error('Invalid password')
    }

    // Count and validate tickets
    const ticketCount = Object.keys(formData).filter(key => key.startsWith('ticket_')).length
    if (ticketCount > MAX_TICKETS) {
      throw new Error(`Maximum of ${MAX_TICKETS} tickets allowed`)
    }

    console.log(formData)

    for (let i = 1; i <= ticketCount; i++) {
      if (typeof formData[`ticket_${i}`] !== 'string' || formData[`ticket_${i}`].trim() === '') {
        throw new Error(`Invalid ticket message for ticket ${i}`)
      }
    }

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(formData.password + BCRYPT_SALT, 10)

    // Create the surprise and associated tickets in a transaction
    const result = await prisma.$transaction(async (prisma) => {
      // Create the surprise
      const surprise = await prisma.surprise.create({
        data: {
          from: formData.from,
          to: formData.to,
          emailFrom: formData.email,
          description: formData.message,
          password: hashedPassword,
        },
      })

      // Create the associated tickets
      const currentDate = new Date()
      
      for (let i = 1; i <= ticketCount; i++) {
        const revealDate = new Date(currentDate)
        revealDate.setDate(currentDate.getDate() + i - 1)
        
        await prisma.tickets.create({
          data: {
            idSurprise: surprise.id,
            message: formData[`ticket_${i}`],
            revealday: revealDate,
          },
        })
      }

      return surprise
    })

    console.log('Surprise and tickets created successfully.')

    // Create the Stripe session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}&surprise_id=${result.id}`,
      cancel_url: `${request.headers.get('origin')}/canceled?surprise_id=${result.id}`,
      metadata: {
        surpriseId: result.id
      }
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (err: any) {
    console.error('Error during the process:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}