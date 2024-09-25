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
      className={`bg-[#170A1C] rounded-lg p-6 shadow-lg cursor-pointer transition-all duration-300 border border-[#9C95DC] ${
        timeLeft === 'Disponível' 
          ? 'hover:shadow-xl hover:scale-105 hover:border-[#228CDB]' 
          : 'opacity-75'
      }`}
      onClick={handleClick}
    >
      <div className="text-center">
        <h3 className="text-xl font-bold text-[#C19AB7] mb-2">Bilhete #{number}</h3>
        {timeLeft === 'Disponível' ? (
          isRevealed ? (
            <p className="text-[#F3F7F0] text-lg">{message}</p>
          ) : (
            <p className="text-[#9C95DC]">Clique para revelar 💌</p>
          )
        ) : (
          <div>
            <p className="mb-2 text-[#9C95DC]">Desbloqueia em</p>
            <p className="text-sm text-[#228CDB]">{timeLeft} ⏱</p>
          </div>
        )}
      </div>
    </div>
  )
}