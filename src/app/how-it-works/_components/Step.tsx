import Image from 'next/image'

interface StepProps {
  title: string
  description: string
  image: string
  stepNumber: number
}

export function Step({ title, description, image, stepNumber }: StepProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className="w-full md:w-1/2 space-y-4">
        <h2 className="text-2xl font-semibold text-[#228CDB]">
          {stepNumber}. {title}
        </h2>
        <p className="text-[#9C95DC]">{description}</p>
      </div>
      <div className="w-full md:w-1/2 relative">
        <div className="w-[240px] h-[427px] mx-auto bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 rounded-[30px] p-[2px] shadow-lg">
          <div className="w-full h-full bg-[#170A1C] rounded-[28px] p-2">
            <div className="relative w-full h-full overflow-hidden rounded-[24px]">
              <Image
                src={image}
                alt={`Passo ${stepNumber}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}