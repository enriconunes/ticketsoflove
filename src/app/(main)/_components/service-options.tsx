export const services = [
  { days: 15, price: 7.90, priceId: 'price_1Q2H1sIMvVF3VKbOizrCrelU' },
  { days: 30, price: 12.90, priceId: 'price_1Q2H2MIMvVF3VKbO4jrnJQCB' },
  { days: 60, price: 15.90, priceId: 'price_1Q2H30IMvVF3VKbOWT45dQTW' },
];

interface ServiceOptionsProps {
  selectedService: number;
  setSelectedService: (service: number) => void;
}

export default function ServiceOptions({ selectedService, setSelectedService }: ServiceOptionsProps) {
  return (
    <div className="flex flex-wrap justify-between gap-4 hover:cursor-pointer">
      {services.map((service) => (
        <p
          key={service.days}
          onClick={() => setSelectedService(service.days)}
          className={`flex-1 border-2 rounded px-3 py-2 text-sm sm:text-base transition-colors ${
            selectedService === service.days ? 'border-red-500 bg-red-500 bg-opacity-20' : 'border-gray-500 hover:border-red-500'
          }`}
        >
          {service.days} bilhetes - R${service.price.toFixed(2)} 💌
        </p>
      ))}
    </div>
  );
}