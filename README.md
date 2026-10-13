# space-delete
coisas

-WebService-Missoes-espacias
prova do dia 06/10/2026

<h1>Guilherme Brites da maia</h1>
Técnico em informática para Internet;
Desenvolver Web Service;

<h1> **Descrição** </h1>
Serviço web em Node.js/Express que faz operações  em CRUD (GET, POST, PUT E DELETE), com entrada e saída de informações em JSON.

<h1> **Endpoints** </h1>

"/missoes" (POST) Endpoint para a criação de um nova missão.

"/missoes/:id" (GET) Endpoint para usca de uma missão por meio do ID registrado.

"/missoes" (GET) Endpoint para filtrar a busca de missões registradas por meio do nome 

"/missoes/:id" (PUT) Endpoint para alterar informações de uma missão já criada (a busca da missão para alteração é por meio do ID registrado).

"/missoes/:id" (DELETE) Endpoint que deleta uma missão por meio do ID .


<h1> **Decisões técnicas** </h1>
Endpoints - Escritos para deixar as ações que serão realizadas explicitas para facilitar na hora dos testes, localização para correções/mudanças no código e visibilidade.

Status Utilizados para dar uma resposta de acordo com a ação realizada para evitar erros e notificar se existem.

<h1> **Como instalar/rodar** </h1>

Clonar o repositório do GitHub na sua máquina ;
Abrir o terminal Git Bash dentro repositório já clonado e executar npm install para instalar.

Para rodar deve abrir o terminal Git Bash dentro repositório e executar npm run dev para iniciar a executá-lo.

Para utilizar os endpoints, abra o Postman e de acordo com cada ação o configure. Ex: "/missoes/buscar/:id" (GET)  Dai pra rodar como GET e na URL http://localhost:3000/missoes/buscar/1 (se o missão estiver registrado ele deve ser retornado juntamente com o status 200 de sucesso). Caso o id/missão buscado não exista será retornado o erro 404 (erro do usuário).