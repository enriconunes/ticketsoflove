'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import ServiceOptions from './(main)/_components/service-options'
import MainForm from './(main)/_components/main-form'
import TicketForms from './(main)/_components/ticket-forms'

export default function LandingPage() {
  const [selectedService, setSelectedService] = useState(30)
  const form = useForm()

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <Image src="/logo.png" alt="Tickets of Love" width={140} height={40} />
        <nav>
          <button className="text-xs sm:text-sm border border-red-500 rounded px-2 py-1 mr-2">pt Português</button>
          <button className="text-xs sm:text-sm border border-red-500 rounded px-2 py-1">us English</button>
        </nav>
      </header>
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-red-500 mb-4">Surpreenda quem você ama!</h1>
        <p className="mb-6 sm:mb-8">Crie bilhetes de amor para uma pessoa especial. Você escreve os bilhetes e nós garantimos que ela só leia um por dia 👀! Escolha a duração da sua surpresa e comece a expressar seu amor de forma única. 💖</p>
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <ServiceOptions selectedService={selectedService} setSelectedService={setSelectedService} />
          <MainForm form={form} />
          <TicketForms form={form} ticketCount={selectedService} />
          <button type="submit" className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors">
            Finalizar supresa 💳
          </button>
        </form>
      </main>
    </div>
  )
}