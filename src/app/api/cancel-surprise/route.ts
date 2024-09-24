import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const { surpriseId } = await request.json()

  try {
    await prisma.$transaction(async (prisma) => {
      // Deletar todos os tickets associados à surpresa
      await prisma.tickets.deleteMany({
        where: { idSurprise: surpriseId },
      })

      // Deletar a surpresa
      await prisma.surprise.delete({
        where: { id: surpriseId },
      })
    })

    return NextResponse.json({ message: 'Surpresa e tickets deletados com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar surpresa e tickets:', error)
    return NextResponse.json({ error: 'Erro ao deletar surpresa e tickets' }, { status: 500 })
  }
}