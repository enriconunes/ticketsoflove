'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Copy, Heart } from 'lucide-react'
import QRCode from 'qrcode'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const surpriseId = searchParams.get('surprise_id')
  const [copied, setCopied] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState('')

  const surpriseLink = `https://TicketsOfLove.com/surprise?id=${surpriseId}`

  useEffect(() => {
    QRCode.toDataURL(surpriseLink)
      .then(url => {
        setQrCodeUrl(url)
      })
      .catch(err => {
        console.error(err)
      })
  }, [surpriseLink])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(surpriseLink).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Image
          src="/logo.png"
          alt="Tickets of Love"
          width={140}
          height={40}
          className="mb-8"
        />
        <h1 className="text-3xl sm:text-4xl font-bold text-red-500 mb-4">Pagamento bem-sucedido!</h1>
        <p className="text-lg sm:text-xl mb-8">
          Ficamos felizes por fazer parte dessa surpresa especial. Seus bilhetes já estão prontos para serem compartilhados! 💌
        </p>
        <p className="text-base mb-8">
            Lembre-se que só é possível acessar os bilhetes com a senha que você definiu, então tome cuidado para não a esquecer 🔐!
        </p>
        <div className="bg-gray-800 p-4 rounded-lg mb-6 border border-red-500">
          <p className="text-lg mb-2">Link para acessar os bilhetes:</p>
          <div className="flex items-center justify-between bg-gray-700 p-2 rounded">
            <span className="text-sm truncate mr-2">{surpriseLink}</span>
            <button
              onClick={copyToClipboard}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors flex items-center"
            >
              {copied ? <CheckCircle className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
        </div>
        
        <div className="mt-8 bg-gray-800 p-6 rounded-lg border flex flex-col justify-center items-center border-red-500">
          <p className="text-lg mb-4">Ou tire um print do QR code abaixo para facilitar o compartilhamento:</p>
          <div className="bg-white p-4 rounded-lg inline-block mb-4 relative">
            {qrCodeUrl && (
              <>
                <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48 sm:w-64 sm:h-64" />
                <div className="absolute inset-0 border-4 border-red-500 rounded-lg pointer-events-none"></div>
                <Heart className="absolute top-2 right-2 text-red-500 w-6 h-6" />
                <Heart className="absolute bottom-2 left-2 text-red-500 w-6 h-6" />
              </>
            )}
          </div>
          <Image
            src="/logo.png"
            alt="Tickets of Love"
            width={100}
            height={100}
            className="mx-auto mt-4"
          />
        </div>

        <p className="text-base text-center mt-8">
          Também enviamos o link para seu e-mail. Se não encontrar, verifique também no Spam e no Lixo Eletrônico.
        </p>
        
        <a
          href="/"
          className="mt-8 bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition-colors inline-block w-full sm:w-auto text-center"
        >
          Voltar para a página inicial
        </a>
      </div>
    </div>
  )
}