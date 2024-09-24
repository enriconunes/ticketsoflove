'use client'

import { Suspense } from 'react'
import Image from 'next/image'
import SuccessContent from './SuccessContent'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Image
          src="/logo.png"
          alt="Tickets of Love"
          width={140}
          height={40}
          className="mb-8"
        />
        <h1 className="text-3xl sm:text-4xl font-bold text-red-500 mb-4">Pagamento bem-sucedido!</h1>
        <p className="text-lg sm:text-xl mb-8">
          Ficamos felizes por fazer parte dessa surpresa especial. Seus bilhetes já estão prontos para serem compartilhados! 💌
        </p>
        <p className="text-base mb-8">
          Lembre-se que só é possível acessar os bilhetes com a senha que você definiu, então tome cuidado para não a esquecer 🔐!
        </p>
        <Suspense fallback={<div>Carregando...</div>}>
          <SuccessContent />
        </Suspense>
        <p className="text-base text-center mt-8">
          Também enviamos o link para seu e-mail. Se não encontrar, verifique também no Spam e no Lixo Eletrônico.
        </p>
        
        <a
          href="/"
          className="mt-8 bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition-colors inline-block w-full sm:w-auto text-center"
        >
          Voltar para a página inicial
        </a>
      </div>
    </div>
  )
}