import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full py-6 mt-12 bg-black/10 backdrop-blur-md opacity-70">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="mb-3 text-sm">
          Quer surpreender alguém especial com seus próprios bilhetes de amor?
        </p>
        <Link 
          href="/"
          className="inline-block px-6 py-2 rounded-full border border-white text-white text-sm font-medium transition-colors hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Crie sua surpresa
        </Link>
        <p className="mt-4 text-xs text-gray-400">
          © {new Date().getFullYear()} Tickets of Love. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}