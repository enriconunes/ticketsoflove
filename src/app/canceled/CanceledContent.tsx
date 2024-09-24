'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function CanceledContent() {
  const searchParams = useSearchParams()
  const surpriseId = searchParams.get('surprise_id')

  useEffect(() => {
    if (surpriseId) {
      fetch('/api/cancel-surprise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ surpriseId }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Surpresa cancelada:', data)
          // Você pode adicionar lógica adicional aqui, como exibir uma mensagem para o usuário
        })
        .catch(error => {
          console.error('Erro ao cancelar surpresa:', error)
        })
    }
  }, [surpriseId])

  return null // This component doesn't render anything visible
}