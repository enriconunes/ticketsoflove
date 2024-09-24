interface SurpriseHeaderProps {
  from: string
  to: string
  description: string
}

export function SurpriseHeader({ from, to, description }: SurpriseHeaderProps) {
  return (
    <div className="mb-12 bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-lg">
      <p className="mb-4">Uma surpresa especial de <span className="font-semibold">{from}</span> para <span className="font-semibold">{to}</span>.</p>
      <p className="text-sm text-white">{description}</p>
    </div>
  )
}