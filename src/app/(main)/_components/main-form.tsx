import { useState, useEffect } from 'react'
import { UseFormReturn, FieldError, Merge, FieldErrorsImpl } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface MainFormProps {
  form: UseFormReturn<any>
}

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
    <div className="space-y-6 bg-[#170A1C] py-2 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="from" className="text-white">🧡 De:</Label>
          <Input
            id="from"
            {...form.register('from', { 
              required: 'Este campo é obrigatório',
              maxLength: {
                value: 50,
                message: 'O nome não pode ter mais de 50 caracteres'
              }
            })}
            className="bg-[#9C95DC] bg-opacity-20 border-[#9C95DC] text-white placeholder-[#9C95DC] focus:border-[#228CDB] focus:ring-[#228CDB]"
            placeholder="Digite seu primeiro nome"
            maxLength={50}
          />
          {form.formState.errors.from && (
            <p className="text-[#C19AB7] text-xs">{getErrorMessage(form.formState.errors.from)}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="to" className="text-white">💚 Para:</Label>
          <Input
            id="to"
            {...form.register('to', { 
              required: 'Este campo é obrigatório',
              maxLength: {
                value: 50,
                message: 'O nome não pode ter mais de 50 caracteres'
              }
            })}
            className="bg-[#9C95DC] bg-opacity-20 border-[#9C95DC] text-white placeholder-[#9C95DC] focus:border-[#228CDB] focus:ring-[#228CDB]"
            placeholder="Digite o nome de quem vai receber a surpresa"
            maxLength={50}
          />
          {form.formState.errors.to && (
            <p className="text-[#C19AB7] text-xs">{getErrorMessage(form.formState.errors.to)}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="text-white">✍🏻 Escreva uma mensagem para entregar essa surpresa:</Label>
        <Textarea
          id="message"
          {...form.register('message', { 
            required: 'Este campo é obrigatório',
            maxLength: {
              value: 300,
              message: 'A mensagem não pode ter mais de 300 caracteres'
            }
          })}
          className="bg-[#9C95DC] bg-opacity-20 border-[#9C95DC] text-white placeholder-[#9C95DC] focus:border-[#228CDB] focus:ring-[#228CDB] min-h-[100px]"
          placeholder="Use sua criatividade! Você tem 300 caracteres para tornar esse momento ainda mais especial"
        />
        <div className="flex justify-between text-sm">
          <span className={remainingChars < 0 ? 'text-[#C19AB7]' : 'text-[#9C95DC]'}>
            {remainingChars} caracteres restantes
          </span>
          {form.formState.errors.message && (
            <p className="text-[#C19AB7] text-xs">{getErrorMessage(form.formState.errors.message)}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-white">📩 Digite seu email para receber o link dos bilhetes:</Label>
        <Input
          id="email"
          type="email"
          {...form.register('email', { 
            required: 'Este campo é obrigatório',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Endereço de email inválido"
            }
          })}
          className="bg-[#9C95DC] bg-opacity-20 border-[#9C95DC] text-white placeholder-[#9C95DC] focus:border-[#228CDB] focus:ring-[#228CDB]"
          placeholder="exemplo@email.com"
        />
        {form.formState.errors.email && (
          <p className="text-[#C19AB7] text-xs">{getErrorMessage(form.formState.errors.email)}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-white">🔑 Crie uma palavra secreta para acessar os bilhetes (mínimo de 6 caracteres):</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            {...form.register('password', { 
              required: 'Este campo é obrigatório',
              minLength: {
                value: 6,
                message: 'A senha deve ter pelo menos 6 caracteres'
              }
            })}
            className="bg-[#9C95DC] bg-opacity-20 border-[#9C95DC] text-white placeholder-[#9C95DC] focus:border-[#228CDB] focus:ring-[#228CDB] pr-10"
            placeholder="Somente quem tiver essa palavra poderá acessar a sua surpresa"
          />
          <button 
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#9C95DC] focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {form.formState.errors.password && (
          <p className="text-[#C19AB7] text-xs">{getErrorMessage(form.formState.errors.password)}</p>
        )}
      </div>
    </div>
  )
}