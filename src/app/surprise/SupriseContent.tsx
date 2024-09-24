'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { PasswordForm } from './passwordForm'
import { SurpriseHeader } from './SurpriseHeader'
import { TicketGrid } from './TicketGrid'
import { Footer } from './footer'

interface Surprise {
  id: string
  from: string
  to: string
  emailFrom: string
  description: string
  createdAt: string
  tickets: {
    id: string
    message: string
    revealday: string
  }[]
}

export default function SurpriseContent() {
  const searchParams = useSearchParams()
  const surpriseId = searchParams.get('id')
  const [surprise, setSurprise] = useState<Surprise | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const fetchSurprise = async (password: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/surprise/${surpriseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })
      const data = await response.json()
      if (response.ok) {
        setSurprise(data)
        setIsAuthenticated(true)
        setError(null)
      } else {
        setError(data.error)
      }
    } catch (err) {
      console.error('Error fetching surprise:', err)
      setError('An error occurred while fetching the surprise')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (surpriseId && !isAuthenticated) {
      setLoading(false)
    }
  }, [surpriseId, isAuthenticated])

  if (loading) {
    return (
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-400 mb-4"></div>
        <p className="text-lg text-pink-200">Carregando sua surpresa...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <PasswordForm onSubmit={fetchSurprise} error={error} />
  }

  if (surprise) {
    return (
      <>
        <SurpriseHeader from={surprise.from} to={surprise.to} description={surprise.description} />
        <TicketGrid tickets={surprise.tickets} />
        <Footer />
      </>
    )
  }

  return null
}