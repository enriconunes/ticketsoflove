import { UseFormReturn } from 'react-hook-form'

interface MainFormProps {
  form: UseFormReturn<any>
}

export default function MainForm({ form }: MainFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="from" className="block mb-1 text-sm">🧡 De:</label>
        <input {...form.register('from')} id="from" className="w-full bg-transparent border-2 border-red-500 rounded px-3 py-2" />
      </div>
      <div>
        <label htmlFor="to" className="block mb-1 text-sm">💚 Para:</label>
        <input {...form.register('to')} id="to" className="w-full bg-transparent border-2 border-red-500 rounded px-3 py-2" />
      </div>
      <div>
        <label htmlFor="message" className="block mb-1 text-sm">✍🏻 Escreva uma mensagem especial para entregar essa surpresa:</label>
        <textarea {...form.register('message')} id="message" rows={4} className="w-full bg-transparent border-2 border-red-500 rounded px-3 py-2" />
      </div>
      <div>
        <label htmlFor="password" className="block mb-1 text-sm">🔐 Crie uma senha para acessar os bilhetes:</label>
        <input {...form.register('password')} id="password" type="password" className="w-full bg-transparent border-2 border-red-500 rounded px-3 py-2" />
      </div>
    </div>
  )
}