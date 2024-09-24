'use client'

import { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import CanceledContent from './CanceledContent'

export default function CanceledPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <img src="./logo.png" width={200} alt="Logo Tickets Of Love" className='mx-auto mb-4'/>
        <h1 className="text-4xl font-bold mb-4">Pagamento cancelado :(</h1>
        <p className="text-xl">Seu pagamento foi cancelado. Se você tiver alguma dúvida, entre em contato conosco.</p>
        <Suspense fallback={<div>Carregando...</div>}>
          <CanceledContent />
        </Suspense>
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