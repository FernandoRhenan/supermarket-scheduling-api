API de uma aplicação de agendamentos para entregadores em supermercados!

Nessa aplicação é possível agendar entregas de forma única, semanal, quinzenal ou a cada 28 dias.
Tem o objetivo de automatizar e otimizar o processo de agendamento e cancelamento de agendamento.
Há um painel administrativo onde o administrador pode ver todas as empresas cadastradas e também ver todos os agendamentos.

Pre-visualização:

<img src="https://github.com/FernandoRhenan/supermarket-scheduling-api/assets/101434984/16757043-671e-4b08-9d77-fb9edd1e90f6" alt="login_img">
<img src="https://github.com/FernandoRhenan/supermarket-scheduling-api/assets/101434984/57ade563-891b-4786-aed1-759687f90f9b" alt="schedules_img">
<img src="https://github.com/FernandoRhenan/supermarket-scheduling-api/assets/101434984/6bfdc011-7aaf-4d64-8883-67999436ecbe" alt="send_email_img">
<img src="https://github.com/FernandoRhenan/supermarket-scheduling-api/assets/101434984/43695e13-0fce-4d9b-9c1d-1680764b7c3b" alt="load_img">

### Backend

Certifique-se de ter o `nodejs` e `docker` instalado na máquina.

O primeiro passo será clonar o repositório para sua maquina.

Então na raiz do projeto, digite no terminal: `npm install`, para baixar todas as dependências e pacotes.

Feito isso, o projeto estará pronto para iniciar, digitando no terminal: `npm run initialize`.
Isso será responsável por inicializar o docker, as migrações do banco de dados, a seed do banco de dados e por último o servidor.

Caso, não seja sua primeira vez rodando o projeto, basta apenas digitar `npm run dev`. Então o docker e o servidor serão inicializados.

*Não se esqueça de preencher suas próprias variáveis de ambiente, criando um aquivo `.env` na raiz do projeto e copiando as variáveis de `.env.exemple` para dentro de `.env`. Assim então posteriomente atribuír valores as variáveis para que a api e banco de dados funcionem.

### Frontend

O projeto da interface de usuário está disponível em:
https://github.com/FernandoRhenan/supermarket-schedule-front
