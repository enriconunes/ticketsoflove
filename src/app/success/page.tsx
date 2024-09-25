'use client'

import { Suspense } from 'react'
import Image from 'next/image'
import SuccessContent from './SuccessContent'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#170A1C] text-[#F3F7F0] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Image
          src="/logo.png"
          alt="Tickets of Love"
          width={140}
          height={40}
          className="mb-8"
        />
        <h1 className="text-3xl sm:text-4xl font-bold text-[#C19AB7] mb-4">Pagamento bem-sucedido!</h1>
        <p className="text-lg sm:text-xl mb-8 text-[#9C95DC]">
          Ficamos felizes por fazer parte dessa surpresa especial. Seus bilhetes já estão prontos para serem compartilhados! 💌
        </p>
        <p className="text-base mb-8 text-[#F3F7F0]">
          Lembre-se que só é possível acessar os bilhetes com a senha que você definiu, então tome cuidado para não a esquecer 🔐!
        </p>
        <Suspense fallback={<div className="text-[#228CDB]">Carregando...</div>}>
          <SuccessContent />
        </Suspense>
        <p className="text-base text-center mt-8 text-white">
          Também enviamos o link para seu e-mail. Se não encontrar, verifique também no Spam e no Lixo Eletrônico.
        </p>
        
        <a
          href="/"
          className="mt-8 bg-[#0B7189] text-[#F3F7F0] px-6 py-3 rounded hover:bg-[#228CDB] transition-colors inline-block w-full sm:w-auto text-center"
        >
          Voltar para a página inicial
        </a>
      </div>
    </div>
  )
}