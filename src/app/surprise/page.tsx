'use client'

import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SurpriseContent from './SupriseContent'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-950 text-white flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Tickets of Love"
            width={140}
            height={40}
            className="mb-8 mx-auto"
          />
        </Link>
        <Suspense fallback={
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-400 mb-4"></div>
            <p className="text-lg text-pink-200">Carregando sua surpresa...</p>
          </div>
        }>
          <SurpriseContent />
        </Suspense>
      </div>
    </div>
  )
}