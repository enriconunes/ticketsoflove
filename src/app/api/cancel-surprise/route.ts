import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const { surpriseId } = await request.json()

  try {
    // Check if the surprise exists
    const existingSurprise = await prisma.surprise.findUnique({
      where: { id: surpriseId },
    })

    if (!existingSurprise) {
      return NextResponse.json({ error: 'Surpresa não encontrada' }, { status: 404 })
    }

    await prisma.$transaction(async (prisma) => {
      // Delete all tickets associated with the surprise
      await prisma.tickets.deleteMany({
        where: { idSurprise: surpriseId },
      })

      // Delete the surprise
      await prisma.surprise.delete({
        where: { id: surpriseId },
      })
    })

    return NextResponse.json({ message: 'Surpresa e tickets deletados com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar surpresa e tickets:', error)
    return NextResponse.json({ error: 'Erro ao deletar surpresa e tickets' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}