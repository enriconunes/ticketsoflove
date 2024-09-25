import Link from 'next/link'
import { Footer } from '../(main)/_components/footer'
import Image from 'next/image'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#170A1C] text-white">
      <div className="p-4 sm:p-6 md:p-8">
        <header className="flex justify-between items-center mb-8">
          <a href='/' className="flex justify-between items-center">
            <Image src="/logo.png" alt="Tickets of Love" width={140} height={40} />
          </a>
        </header>
        <main className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#2db8d7] mb-6">Termos de Uso</h1>
          <div className="space-y-6 text-[#9C95DC]">
            <p>Última atualização: 25 de setembro de 2024</p>

            <section>
              <h2 className="text-xl font-semibold text-white mb-2">1. Aceitação dos Termos</h2>
              <p>Ao acessar e utilizar o Tickets of Love, você concorda em cumprir e ficar vinculado aos seguintes Termos de Uso. Caso não concorde com qualquer parte destes termos, você não deve utilizar a plataforma.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-2">2. Descrição do Serviço</h2>
              <p>O Tickets of Love permite que usuários criem uma experiência personalizada de escrita e entrega de bilhetes. Os usuários podem escolher a quantidade de bilhetes (dias de surpresa), preencher um formulário principal, criar mensagens personalizadas para cada bilhete e compartilhar essa experiência com uma pessoa especial.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-2">3. Cadastro e Segurança</h2>
              <p>Para utilizar o serviço, você deve fornecer um endereço de email válido e criar uma palavra secreta. Não compartilharemos seu email com terceiros. A palavra secreta é essencial para acessar a surpresa e deve ser mantida em sigilo. Usamos criptografia para armazenar a sua senha, garantindo a integridade e o sigilo.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-2">4. Privacidade</h2>
              <p>Respeitamos a sua privacidade. Não utilizamos seus dados para qualquer tipo de processamento ou venda de dados para terceiros. O email cadastrado é utilizado apenas para o envio do link da surpresa e comunicações relacionadas ao serviço.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-2">5. Conteúdo do Usuário</h2>
              <p>Você é responsável pelo conteúdo que insere na plataforma, incluindo mensagens e informações pessoais. Não nos responsabilizamos por qualquer conteúdo impróprio ou ilegal inserido pelos usuários.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-2">6. Pagamentos e Reembolsos</h2>
              <p>Todos os pagamentos são processados através de um provedor de pagamentos seguro chamado Stripe. Após a conclusão do pagamento, você receberá um link para acessar e compartilhar sua surpresa. Não oferecemos reembolsos, exceto em casos excepcionais a nosso exclusivo critério.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-2">7. Disponibilidade do Serviço</h2>
              <p>Nos comprometemos a manter o serviço ativo e disponível pelo período contratado, conforme o plano escolhido (até 60 dias). No entanto, em circunstâncias excepcionais que fujam ao nosso controle, como questões técnicas ou legais, reservamo-nos o direito de modificar ou interromper temporariamente o serviço. Faremos o possível para notificar os usuários em caso de interrupções planejadas.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-2">8. Limitação de Responsabilidade</h2>
              <p>Em nenhuma circunstância seremos responsáveis por qualquer dano indireto, incidental, especial ou consequente decorrente de ou relacionado ao uso ou incapacidade de uso da plataforma, incluindo a perda de dados ou conteúdo dos bilhetes.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-2">9. Uso Adequado</h2>
              <p>O Tickets of Love destina-se a criar experiências positivas. Não é permitido o uso da plataforma para enviar conteúdo ofensivo, difamatório, ilegal ou que viole os direitos de terceiros.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-2">10. Alterações nos Termos</h2>
              <p>Podemos atualizar estes Termos de Uso periodicamente. Quando fizermos isso, revisaremos a data da &ldquo;última atualização&rdquo; no topo desta página. É sua responsabilidade revisar estes Termos de Uso periodicamente para se manter informado sobre quaisquer alterações.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-2">11. Propriedade Intelectual</h2>
              <p>Todo o conteúdo fornecido pelo Tickets of Love, incluindo logotipos, designs e software, é protegido por direitos autorais e outras leis de propriedade intelectual. O uso não autorizado deste conteúdo é estritamente proibido.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-2">12. Contato</h2>
              <p>Se você tiver alguma dúvida sobre estes Termos de Uso ou qualquer outra questão, entre em contato pelo email: enriconunesdev@gmail.com</p>
            </section>

            <p>Ao utilizar o Tickets of Love, você reconhece que leu, entendeu e concorda com estes Termos de Uso.</p>
          </div>
        </main>
        <a
          href="/"
          className="mt-8 bg-[#0B7189] text-[#F3F7F0] px-6 py-3 rounded hover:bg-[#228CDB] transition-colors inline-block w-full sm:w-auto text-center"
        >
          Voltar para a página inicial
        </a>
      </div>
      <Footer />
    </div>
  )
}