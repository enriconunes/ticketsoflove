import { useState, useEffect } from 'react'
import { UseFormReturn, FieldError, Merge, FieldErrorsImpl } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'

interface MainFormProps {
  form: UseFormReturn<any>
}

// Helper function to safely get error message
const getErrorMessage = (error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined): string => {
  return (error as FieldError)?.message || '';
}

export default function MainForm({ form }: MainFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [remainingChars, setRemainingChars] = useState(300)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'message') {
        setRemainingChars(300 - (value.message?.length || 0))
      }
    })
    return () => subscription.unsubscribe()
  }, [form])

  return (
    <div className="space-y-4">
      {/* From field */}
      <div>
        <label htmlFor="from" className="block mb-1 text-sm">🧡 De:</label>
        <input 
          {...form.register('from', { 
            required: 'Este campo é obrigatório',
            maxLength: {
              value: 50,
              message: 'O nome não pode ter mais de 50 caracteres'
            }
          })}
          id="from" 
          className="w-full bg-transparent border-2 border-red-500 rounded px-3 py-2"
          placeholder='Digite seu primeiro nome'
          maxLength={50}
        />
        {form.formState.errors.from && (
          <p className="text-red-400 text-sm mt-1">{getErrorMessage(form.formState.errors.from)}</p>
        )}
      </div>

      {/* To field */}
      <div>
        <label htmlFor="to" className="block mb-1 text-sm">💚 Para:</label>
        <input 
          {...form.register('to', { 
            required: 'Este campo é obrigatório',
            maxLength: {
              value: 50,
              message: 'O nome não pode ter mais de 50 caracteres'
            }
          })}
          id="to" 
          className="w-full bg-transparent border-2 border-red-500 rounded px-3 py-2" 
          placeholder='Digite o nome de quem vai receber a surpresa'
          maxLength={50}
        />
        {form.formState.errors.to && (
          <p className="text-red-400 text-sm mt-1">{getErrorMessage(form.formState.errors.to)}</p>
        )}
      </div>

      {/* Message field with character limit */}
      <div>
        <label htmlFor="message" className="block mb-1 text-sm">
          ✍🏻 Escreva uma mensagem especial para entregar essa surpresa:
        </label>
        <textarea 
          {...form.register('message', { 
            required: 'Este campo é obrigatório',
            maxLength: {
              value: 300,
              message: 'A mensagem não pode ter mais de 300 caracteres'
            }
          })}
          id="message" 
          rows={4} 
          className="w-full bg-transparent border-2 border-red-500 rounded px-3 py-2" 
          placeholder='Use sua criatividade! Você tem 300 caracteres para tornar esse momento ainda mais especial'
        />
        <div className="flex justify-between text-sm mt-1">
          <span className={remainingChars < 0 ? 'text-red-400' : 'text-gray-400'}>
            {remainingChars} caracteres restantes
          </span>
          {form.formState.errors.message && (
            <p className="text-red-400">{getErrorMessage(form.formState.errors.message)}</p>
          )}
        </div>
      </div>

      {/* Email field */}
      <div>
        <label htmlFor="email" className="block mb-1 text-sm">📩 Digite seu email para receber o link dos bilhetes:</label>
        <input 
          {...form.register('email', { 
            required: 'Este campo é obrigatório',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Endereço de email inválido"
            }
          })}
          id="email" 
          type="email" 
          className="w-full bg-transparent border-2 border-red-500 rounded px-3 py-2" 
          placeholder='exemplo@email.com'
        />
        {form.formState.errors.email && (
          <p className="text-red-400 text-sm mt-1">{getErrorMessage(form.formState.errors.email)}</p>
        )}
      </div>

      {/* Password field with visibility toggle */}
      <div>
        <label htmlFor="password" className="block mb-1 text-sm">🔑 Crie uma palavra secreta para acessar os bilhetes (mínimo de 6 caracteres):</label>
        <div className="relative">
          <input 
            {...form.register('password', { 
              required: 'Este campo é obrigatório',
              minLength: {
                value: 6,
                message: 'A senha deve ter pelo menos 6 caracteres'
              }
            })}
            id="password" 
            type={showPassword ? "text" : "password"} 
            className="w-full bg-transparent border-2 border-red-500 rounded px-3 py-2 pr-10"
            placeholder='Somente quem tiver essa palavra poderá acessar a sua surpresa'
          />
          <button 
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-red-500 focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {form.formState.errors.password && (
          <p className="text-red-400 text-sm mt-1">{getErrorMessage(form.formState.errors.password)}</p>
        )}
      </div>
    </div>
  )
}