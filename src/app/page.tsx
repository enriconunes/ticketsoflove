'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { loadStripe } from '@stripe/stripe-js'
import ServiceOptions, { services } from './(main)/_components/service-options'
import MainForm from './(main)/_components/main-form'
import TicketForms from './(main)/_components/ticket-forms'

// Initialize Stripe with the public key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// Define the structure of our form data
interface FormData {
  from: string;
  to: string;
  message: string;
  email: string;
  password: string;
  [key: string]: string; // This allows for dynamic properties like ticket_1, ticket_2, etc.
}

export default function LandingPage() {
  // State to store the selected service (30, 60, or 100 days)
  const [selectedService, setSelectedService] = useState(30)
  
  // Initialize react-hook-form
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

  // State to manage loading status during checkout
  const [loading, setLoading] = useState(false)
  // State to manage form-wide error messages
  const [formError, setFormError] = useState<string | null>(null)

  const handleCheckout = async (formData: FormData) => {
    setFormError(null) // Clear any previous errors

    // Check for empty tickets
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
      // Find the price ID for the selected service
      const selectedPriceId = services.find(s => s.days === selectedService)?.priceId

      // Send data to server to create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          priceId: selectedPriceId,
          formData: formData
        }),
      })

      const { sessionId } = await response.json()
      const stripe = await stripePromise
      
      // Redirect to Stripe checkout
      const { error } = await stripe!.redirectToCheckout({ sessionId })

      if (error) {
        console.error('Erro ao redirecionar para o checkout:', error)
        setFormError('Erro ao redirecionar para o checkout. Por favor, tente novamente.')
      } else {
        // Remove information from local storage after successful redirect
        localStorage.removeItem('ticketsOfLove')
      }
    } catch (err) {
      console.error('Erro ao criar a sessão de checkout:', err)
      setFormError('Erro ao criar a sessão de checkout. Por favor, tente novamente.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <Image src="/logo.png" alt="Tickets of Love" width={140} height={40} />
      </header>
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-red-500 mb-4">Surpreenda quem você ama!</h1>
        <p className="mb-6 sm:mb-8">
          Crie bilhetes de amor para uma pessoa especial. Você escreve os bilhetes e{' '}
          <span className="font-medium text-red-200">
            nós garantimos que ela só leia um por dia 
          </span>
          <span> a partir de hoje 👀! Escolha a duração da sua surpresa e comece a expressar seu amor de forma única. 💖</span>
        </p>
        {formError && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {formError}
          </div>
        )}
        <form className="space-y-6 sm:space-y-8" onSubmit={form.handleSubmit(handleCheckout)}>
          <ServiceOptions selectedService={selectedService} setSelectedService={setSelectedService} />
          <MainForm form={form} />
          <TicketForms form={form} ticketCount={selectedService} />
          <button 
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Processando...' : 'Finalizar surpresa 💳'}
          </button>
        </form>
      </main>
    </div>
  )
}