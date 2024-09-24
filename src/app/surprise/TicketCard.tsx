import { useState, useEffect } from 'react'

interface TicketCardProps {
  number: number
  message: string
  revealDay: Date
}

export function TicketCard({ number, message, revealDay }: TicketCardProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const difference = revealDay.getTime() - now.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
      } else {
        setTimeLeft('Disponível')
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [revealDay])

  const handleClick = () => {
    if (timeLeft === 'Disponível') {
      setIsRevealed(!isRevealed)
    }
  }

  return (
    <div 
      className={`bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg cursor-pointer transition-all duration-300 ${timeLeft === 'Disponível' ? 'hover:shadow-xl hover:scale-105' : 'opacity-75'}`}
      onClick={handleClick}
    >
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">Bilhete #{number}</h3>
        {timeLeft === 'Disponível' ? (
          isRevealed ? (
            <p className="text-white text-lg">{message}</p>
          ) : (
            <p className="">Clique para revelar 💌</p>
          )
        ) : (
          <div>
            <p className="mb-2">Desbloqueia em</p>
            <p className="text-sm text-gray-400">{timeLeft} ⏱</p>
          </div>
        )}
      </div>
    </div>
  )
}