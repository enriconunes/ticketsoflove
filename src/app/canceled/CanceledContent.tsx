'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function CanceledContent() {
  const searchParams = useSearchParams()
  const surpriseId = searchParams.get('surprise_id')
  const [cancelStatus, setCancelStatus] = useState<'pending' | 'success' | 'error'>('pending')

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
          setCancelStatus('success')
        })
        .catch(error => {
          console.error('Erro ao cancelar surpresa:', error)
          setCancelStatus('error')
        })
    }
  }, [surpriseId])

  if (cancelStatus === 'pending') {
    return null
  }

  return (
    <div className={`mt-4 p-3 rounded ${cancelStatus === 'success' ? 'bg-[#0B7189]' : 'bg-[#F2545B]'}`}>
      {cancelStatus === 'success' ? (
        <p className="text-[#F3F7F0]">Sua surpresa foi cancelada com sucesso.</p>
      ) : (
        <p className="text-[#F3F7F0]">Houve um erro ao cancelar sua surpresa. Por favor, entre em contato conosco.</p>
      )}
    </div>
  )
}