import Image from 'next/image'

export function Header() {
  return (
    <a href='/' className="flex justify-between items-center mb-8">
      <Image src="/logo.png" alt="Tickets of Love" width={140} height={40} />
    </a>
  )
}