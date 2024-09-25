import { Steps } from './_components/Steps'
import { Header } from './_components/Header'

export default function Page() {
  return (
    <main className="min-h-screen bg-[#170A1C] text-white p-4 sm:p-6 md:p-8">
      <Header />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl md:text-3xl text-center sm:text-4xl font-bold text-[#2db8d7] mb-10">Como o <span className='font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-red-300'>Tickets of Love</span> funciona</h1>
        <Steps />
      </div>
      <a
          href="/"
          className="mt-8 bg-[#0B7189] text-[#F3F7F0] px-6 py-3 rounded hover:bg-[#228CDB] transition-colors inline-block w-full sm:w-auto text-center"
        >
          Voltar para a página inicial
        </a>
    </main>
  )
}