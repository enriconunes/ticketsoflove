interface ServiceOptionsProps {
  selectedService: number
  setSelectedService: (service: number) => void
}

export default function ServiceOptions({ selectedService, setSelectedService }: ServiceOptionsProps) {
  const services = [
    { days: 30, price: 7.90 },
    { days: 60, price: 12.90 },
    { days: 100, price: 15.90 },
  ]

  return (
    <div className="flex flex-wrap justify-between gap-4">
      {services.map((service) => (
        <button
          key={service.days}
          onClick={() => setSelectedService(service.days)}
          className={`flex-1 border-2 rounded px-3 py-2 text-sm sm:text-base transition-colors ${
            selectedService === service.days ? 'border-red-500 bg-red-500 bg-opacity-20' : 'border-gray-500 hover:border-red-500'
          }`}
        >
          {service.days} bilhetes - R${service.price.toFixed(2)} 💌
        </button>
      ))}
    </div>
  )
}