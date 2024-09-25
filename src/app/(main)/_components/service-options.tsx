import { useState } from 'react'

export const services = [
  { days: 15, price: 7.90, priceId: 'price_1Q2gxXIMvVF3VKbO0qiDsDSJ' },
  { days: 30, price: 12.90, priceId: 'price_1Q2gyxIMvVF3VKbOKcvyFYhP' },
  { days: 60, price: 15.90, priceId: 'price_1Q2gzlIMvVF3VKbOY2Whi74S' },
];

interface ServiceOptionsProps {
  selectedService: number;
  setSelectedService: (service: number) => void;
}

export default function ServiceOptions({ selectedService, setSelectedService }: ServiceOptionsProps) {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      {services.map((service) => (
        <div
          key={service.days}
          onClick={() => setSelectedService(service.days)}
          onMouseEnter={() => setHoveredService(service.days)}
          onMouseLeave={() => setHoveredService(null)}
          className={`
            relative p-6 text-left hover:cursor-pointer
            transition-all duration-300 ease-in-out
            bg-[#170A1C] border border-[#9C95DC]
            ${
              selectedService === service.days || hoveredService === service.days
                ? 'shadow-lg transform -translate-y-1'
                : 'shadow-md'
            }
          `}
          aria-pressed={selectedService === service.days}
        >
          <span className="block text-white text-2xl font-bold mb-1">{service.days} dias</span>
          <span className="block text-[#228CDB] text-3xl font-extrabold mb-4">
            R${service.price.toFixed(2)}
          </span>
          <span className="block text-[#9C95DC] text-xs">
           Escreva {service.days} bilhetes 💌
          </span>
          <div 
            className={`
              absolute bottom-0 left-0 w-full h-1 bg-[#228CDB]
              transition-all duration-300 ease-in-out
              ${
                selectedService === service.days || hoveredService === service.days
                  ? 'opacity-100'
                  : 'opacity-0'
              }
            `}
          />
        </div>
      ))}
    </div>
  );
}