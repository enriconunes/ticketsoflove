'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function CanceledPage() {
  const router = useRouter()
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

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <img src="./logo.png" width={200} alt="Logo Tickets Of Love" className='mx-auto mb-4'/>
        <h1 className="text-4xl font-bold mb-4">Pagamento cancelado :(</h1>
        <p className="text-xl">Seu pagamento foi cancelado. Se você tiver alguma dúvida, entre em contato conosco.</p>
        <button 
          onClick={() => router.push('/')}
          className="mt-8 bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600"
        >
          Voltar para a página inicial
        </button>
      </div>
    </div>
  )
}