import { Step } from './Step'

const steps = [
  {
    title: "Selecione a quantidade de bilhetes",
    description: "Cada bilhete representa um dia de experiência. Escolha a melhor quantidade para você.",
    image: "/step-1.png"
  },
  {
    title: "Preencha o formulário principal",
    description: "Forneça as informações necessárias para criar sua experiência especial.",
    image: "/step-2.png"
  },
  {
    title: "Preencha os bilhetes",
    description: "Clique sobre os bilhetes para preenchê-los com suas mensagens de amor.",
    image: "/step-3.png"
  },
  {
    title: "Finalize e faça o pagamento",
    description: "Conclua o processo e efetue o pagamento para ativar sua criação.",
    image: "/step-4.png"
  },
  {
    title: "Receba o link e compartilhe",
    description: "Após o pagamento, você receberá um link no site e no seu email. Confira o lixo eletrônico e o spam. Você também pode usar o QR code apresentado na tela para compartilhar.",
    image: "/step-5.png"
  },
  {
    title: "Use a palavra secreta para acessar a surpresa",
    description: "Lembre-se que é preciso usar a palavra secreta que você definiu no início sempre que for acessar o conteúdo especial.",
    image: "/step-6.png"
  },
  {
    title: "Resultado",
    description: "O resultado final será parecido com este exemplo. Observe que desbloqueamos somente um bilhete por dia:",
    image: "/step-7.png"
  }
]

export function Steps() {
  return (
    <div className="space-y-12">
      {steps.map((step, index) => (
        <Step key={index} {...step} stepNumber={index + 1} />
      ))}
    </div>
  )
}