import { TicketCard } from './TicketCard'

interface Ticket {
  id: string
  message: string
  revealday: string
}

interface TicketGridProps {
  tickets: Ticket[]
}

export function TicketGrid({ tickets }: TicketGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tickets.map((ticket, index) => (
        <TicketCard
          key={ticket.id}
          number={index + 1}
          message={ticket.message}
          revealDay={new Date(ticket.revealday)}
        />
      ))}
    </div>
  )
}