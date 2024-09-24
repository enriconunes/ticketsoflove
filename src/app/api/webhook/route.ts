import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import Stripe from 'stripe'
import { Resend } from 'resend'
import { EmailTemplate } from '@/app/(main)/_components/email-template'

// Inicialização dos clientes para Prisma, Stripe e Resend
const prisma = new PrismaClient()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})
const resend = new Resend(process.env.RESEND_API_KEY)

// Chave secreta do webhook do Stripe
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: Request) {
  // Obtém o corpo da requisição como texto
  const body = await request.text()
  // Obtém a assinatura do Stripe do cabeçalho da requisição
  const sig = request.headers.get('stripe-signature') as string

  let event: Stripe.Event

  try {
    // Verifica a autenticidade do evento usando a assinatura do Stripe
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err: any) {
    // Retorna erro 400 se a verificação falhar
    return NextResponse.json({ error: `Erro no Webhook: ${err.message}` }, { status: 400 })
  }

  // Função para processar o pagamento bem-sucedido
  async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
    try {
      // Busca a surpresa no banco de dados usando o ID armazenado nos metadados da sessão
      const surprise = await prisma.surprise.findUnique({
        where: { id: session.metadata?.surpriseId },
      })

      if (surprise) {
        // Envia o email de confirmação usando o Resend
        const { data, error } = await resend.emails.send({
          from: 'noreply@enriconunes.com',
          to: [surprise.emailFrom],
          subject: 'Sua surpresa foi criada com sucesso!',
          react: EmailTemplate({ firstName: surprise.to, surprise_id: surprise.id }),
        })

        if (error) {
          console.error('Erro ao enviar email:', error)
        } else {
          console.log('Email enviado com sucesso:', data)
        }
      }
    } catch (error) {
      console.error('Erro ao processar pagamento bem-sucedido:', error)
    }
  }

  // Função para deletar a surpresa e tickets associados
  async function deleteSurpriseAndTickets(surpriseId: string) {
    try {
      await prisma.$transaction(async (prisma) => {
        // Deleta todos os tickets associados à surpresa
        await prisma.tickets.deleteMany({
          where: { idSurprise: surpriseId },
        })

        // Deleta a surpresa
        await prisma.surprise.delete({
          where: { id: surpriseId },
        })
      })

      console.log(`Surpresa e tickets deletados com sucesso: ${surpriseId}`)
    } catch (error) {
      console.error(`Erro ao deletar surpresa e tickets: ${error}`)
    }
  }

  // Processa diferentes tipos de eventos
  switch (event.type) {
    case 'checkout.session.completed':
      const successSession = event.data.object as Stripe.Checkout.Session
      await handleSuccessfulPayment(successSession)
      break

    case 'checkout.session.expired':
    case 'payment_intent.payment_failed':
    case 'payment_intent.canceled':
    case 'charge.failed':
    case 'charge.refunded':
      const failedSession = event.data.object as Stripe.Checkout.Session
      if (failedSession.metadata?.surpriseId) {
        await deleteSurpriseAndTickets(failedSession.metadata.surpriseId)
      }
      break

    // Adicione outros casos conforme necessário

    default:
      console.log(`Evento não tratado: ${event.type}`)
  }

  // Retorna uma resposta de sucesso para o Stripe
  return NextResponse.json({ received: true })
}