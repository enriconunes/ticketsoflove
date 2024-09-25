import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface SurpriseHeaderProps {
  from: string
  to: string
  description: string
}

export function SurpriseHeader({ from, to, description }: SurpriseHeaderProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="mb-6 bg-[#170A1C] rounded-lg p-6 shadow-lg border border-[#9C95DC]">
      <p className="mb-4 text-[#F3F7F0]">
        Uma surpresa especial de <span className="font-semibold text-[#C19AB7]">{from}</span> para <span className="font-semibold text-[#C19AB7]">{to}</span>.
      </p>
      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-full' : 'max-h-20 sm:max-h-full'}`}>
        <p className="text-sm text-[#9C95DC]">"{description}"</p>
      </div>
      <button 
        className="mt-2 text-[#228CDB] hover:text-[#0B7189] transition-colors duration-300 sm:hidden flex items-center justify-center w-full"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls="description-text"
      >
        {isExpanded ? (
          <>
            <span className="mr-1">Recolher</span>
            <ChevronUp size={20} />
          </>
        ) : (
          <>
            <span className="mr-1">Ver a mensagem</span>
            <ChevronDown size={20} />
          </>
        )}
      </button>
    </div>
  )
}