'use client'

import { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import CanceledContent from './CanceledContent'

export default function CanceledPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#170A1C] text-[#F3F7F0] flex items-center justify-center">
      <div className="text-center p-6 max-w-2xl">
        <Image src="/logo.png" width={200} height={60} alt="Logo Tickets Of Love" className='mx-auto mb-4'/>
        <h1 className="text-4xl font-bold mb-4 text-[#C19AB7]">Pagamento cancelado :(</h1>
        <p className="text-xl mb-6 text-[#9C95DC]">Seu pagamento foi cancelado. Se você tiver alguma dúvida, entre em contato conosco.</p>
        <Suspense fallback={<div className="text-[#228CDB]">Carregando...</div>}>
          <CanceledContent />
        </Suspense>
        <button 
          onClick={() => router.push('/')}
          className="mt-8 bg-[#0B7189] text-[#F3F7F0] px-6 py-3 rounded hover:bg-[#228CDB] transition-colors"
        >
          Voltar para a página inicial
        </button>
      </div>
    </div>
  )
}