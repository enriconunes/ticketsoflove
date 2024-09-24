import { useState } from 'react'

interface PasswordFormProps {
  onSubmit: (password: string) => void
  error: string | null
}

export function PasswordForm({ onSubmit, error }: PasswordFormProps) {
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(password)
  }

  return (
    <div className="text-center bg-white/15 text-white backdrop-blur-md rounded-lg p-8 shadow-lg">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">Surpresa Protegida</h1>
      <p className="text-lg sm:text-xl mb-8">
        Para ver esta surpresa, por favor digite a palavra secreta 🔑:
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite a palavra"
          className="w-full p-3 mb-4 bg-gray-800 rounded-md border border-white focus:border-white focus:outline-none"
        />
        <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition-colors">
          Desbloquear 🔐
        </button>
      </form>
      {error && <p className="mt-4 text-white">{error}</p>}
    </div>
  )
}