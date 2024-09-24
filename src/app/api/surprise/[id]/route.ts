import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()
const BCRYPT_SALT = process.env.BCRYPT_SALT || ''

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const { password } = await request.json()

  try {
    const surprise = await prisma.surprise.findUnique({
      where: { id },
      select: { password: true }
    })

    if (!surprise) {
      return NextResponse.json({ error: 'Surprise not found' }, { status: 404 })
    }

    const passwordMatch = await bcrypt.compare(password + BCRYPT_SALT, surprise.password)

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Senha incorreta. Tente novamente.' }, { status: 401 })
    }

    const fullSurprise = await prisma.surprise.findUnique({
      where: { id },
      include: {
        tickets: true,
      },
    })

    return NextResponse.json(fullSurprise)
  } catch (error) {
    console.error('Error verifying surprise password:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}