'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { loadStripe } from '@stripe/stripe-js'
import ServiceOptions, { services } from './(main)/_components/service-options'
import MainForm from './(main)/_components/main-form'
import TicketForms from './(main)/_components/ticket-forms'
import { AnimatedGradientTextDemo } from './(main)/_components/animated-gradient-demol'

// Inicializa o Stripe com a chave pública
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// Define a estrutura dos dados do formulário
interface FormData {
  from: string;
  to: string;
  message: string;
  email: string;
  password: string;
  [key: string]: string; // Isso permite propriedades dinâmicas como ticket_1, ticket_2, etc.
}

export default function LandingPage() {
  // Estado para armazenar o serviço selecionado (30, 60 ou 100 dias)
  const [selectedService, setSelectedService] = useState(30)
  
  // Inicializa o react-hook-form
  const form = useForm<FormData>({
    mode: 'onSubmit',
    defaultValues: {
      from: '',
      to: '',
      message: '',
      email: '',
      password: '',
    },
  })

  // Estado para gerenciar o status de carregamento durante o checkout
  const [loading, setLoading] = useState(false)
  // Estado para gerenciar mensagens de erro do formulário
  const [formError, setFormError] = useState<string | null>(null)

  const handleCheckout = async (formData: FormData) => {
    setFormError(null) // Limpa quaisquer erros anteriores

    // Verifica se há tickets vazios
    const emptyTickets = Array.from({ length: selectedService }, (_, index) => index).filter(index => {
      const ticketValue = formData[`ticket_${index + 1}`];
      return !ticketValue || ticketValue.trim() === '';
    })

    if (emptyTickets.length > 0) {
      setFormError(`Por favor, preencha todos os bilhetes antes de finalizar a compra. Bilhetes vazios: ${emptyTickets.map(i => i + 1).join(', ')}`)
      return
    }

    setLoading(true)
    try {
      // Encontra o ID do preço para o serviço selecionado
      const selectedPriceId = services.find(s => s.days === selectedService)?.priceId

      // Filtra os tickets para incluir apenas os correspondentes ao plano selecionado
      const filteredFormData = Object.entries(formData).reduce((acc, [key, value]) => {
        if (!key.startsWith('ticket_') || parseInt(key.split('_')[1]) <= selectedService) {
          acc[key] = value;
        }
        return acc;
      }, {} as FormData);

      // Envia dados para o servidor para criar a sessão de checkout
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          priceId: selectedPriceId,
          formData: filteredFormData
        }),
      })

      const { sessionId } = await response.json()
      const stripe = await stripePromise
      
      // Redireciona para o checkout do Stripe
      const { error } = await stripe!.redirectToCheckout({ sessionId })

      if (error) {
        console.error('Erro ao redirecionar para o checkout:', error)
        setFormError('Erro ao redirecionar para o checkout. Por favor, tente novamente.')
      } else {
        // Remove as informações do localStorage após o redirecionamento bem-sucedido
        localStorage.removeItem('ticketsOfLove')
      }
    } catch (err) {
      console.error('Erro ao criar a sessão de checkout:', err)
      setFormError('Erro ao criar a sessão de checkout. Por favor, tente novamente.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#170A1C] text-white p-4 sm:p-6 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <Image src="/logo.png" alt="Tickets of Love" width={140} height={40} />
      </header>
      <main className="max-w-4xl mx-auto">
        <h1 className="mb-2 text-2xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-red-300">Proporcione uma surpresa diária para uma pessoa especial!</h1>
        <p className="mb-6 sm:mb-8 text-white">
          Escreva bilhetes especiais para uma pessoa importante. Você escreve os bilhetes e{' '}
          <span className="font-bold">
            nós garantimos que ela só leia um por dia 
          </span>
          <span className="text-white"> a partir de hoje 👀! Escolha a duração da sua surpresa e comece a criar uma lembrança inesquecível. 💖</span>
        </p>
        <AnimatedGradientTextDemo />
        {formError && (
          <div className="bg-[#C19AB7] text-[#170A1C] p-3 mb-4">
            {formError}
          </div>
        )}
        <form className="space-y-6 sm:space-y-8" onSubmit={form.handleSubmit(handleCheckout)}>
          <ServiceOptions selectedService={selectedService} setSelectedService={setSelectedService} />
          <MainForm form={form} />
          <TicketForms form={form} ticketCount={selectedService} />
          <button 
            type="submit"
            className="w-full bg-[#0B7189] text-white py-2 hover:bg-[#228CDB] transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Registrando bilhetes...' : 'Finalizar surpresa 💳'}
          </button>
        </form>
      </main>
    </div>
  )
}