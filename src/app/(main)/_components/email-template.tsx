import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  surprise_id: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  surprise_id
}) => (
  <div>
    <h1>Olá, {firstName}!</h1>
    <p>Como prometido, aqui está o link para você acessar a sua lista de bilhetes:</p>
    <a href={`https://TicketsOfLove.com/surprise?id=${surprise_id}`}>https://TicketsOfLove.com/surprise?id={surprise_id}</a>
    <p>Lembre-se de usar a sua senha para visualizar o resultado! :D</p>
  </div>
);
