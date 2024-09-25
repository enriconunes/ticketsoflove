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
    <div className="text-center bg-[#170A1C] text-white rounded-lg p-8 shadow-lg border border-[#9C95DC]">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-[#C19AB7]">Surpresa Protegida</h1>
      <p className="text-lg sm:text-xl mb-8 text-[#9C95DC]">
        Para ver esta surpresa, por favor digite a palavra secreta 🔑:
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite a palavra"
          className="w-full p-3 mb-4 bg-[#170A1C] rounded-md border border-[#9C95DC] focus:border-[#228CDB] focus:outline-none text-white placeholder-[#9C95DC]/50"
        />
        <button 
          type="submit" 
          className="w-full bg-[#0B7189] text-white py-3 rounded-md hover:bg-[#228CDB] transition-colors"
        >
          Desbloquear 🔐
        </button>
      </form>
      {error && <p className="mt-4 text-[#C19AB7]">{error}</p>}
    </div>
  )
}