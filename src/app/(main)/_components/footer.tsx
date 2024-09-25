import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#170A1C] text-white py-6 mt-12">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-[#9C95DC] mb-4 sm:mb-0">
          © {new Date().getFullYear()} Tickets of Love. Todos os direitos reservados.
        </p>
        <nav className="flex space-x-4">
          <Link href="/terms" className="text-sm text-[#228CDB] hover:text-[#2db8d7] transition-colors">
            Termos de Uso
          </Link>
        </nav>
      </div>
    </footer>
  )
}