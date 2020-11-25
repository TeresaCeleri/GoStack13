# Recuperação de senha
**RF** - requisitos funcionais
- são as funcionalidades - recuperar a senha com emil antigo:
- o usuario deve poder recuperar sua senha nformando seu email;
- o usuario deve receber um email com instrucoes;
- o usuario deve poder resetar sua senha;

***RNF** - requisitos não funcionais
- coisas ão ligadas direto com a regra de negócio
- Utilizar mailtrap (email falso) para testar envio em ambiente DEV;
- Ulitizar Amazon SES para envios em produção;
- O envio de email deve acontecer em segundo plano blackground job);

**RN** - regra de negócio
- O link enviado por email deve expirar em 2 horas;
- O usuario precisa confirmar sua senha ao resetar sua senha;

# Atualização do perfil
**RF** - requisitos funcionais
- o usuaro deve poder atualizar o seu perfil - nome,email,senha

***RNF** - requisitos não funcionais

**RN** - regra de negócio
- O usuario não pode alterar seu email para email já utilizado;
- para atualizar sua senha o usuario deve informar nova senha antiga;
- para atualizar sua senha o usuario precisa confirmar a nov senha;

# Painel do prestador
**RF** - requisitos funcionais
- O usuario deve poder listar seus agendamentos de um dia especifico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
-  O prestador deve poder visualizar as notificações não lidas;

***RNF** - requisitos não funcionais
- Os agendamentos do prestador deve ser armazenada em cache;
- As notificações do prestador devem ser armazenadas no mongoDB - bco não relacional;
- As notificações do prestador deem ser enviadas em tempo-real utilizando Socket-io;

**RN** - regra de negócio
- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;

# Agendamento de serviços

**RF** - requisitos funcionais
- O usuario deve poder listar os prestadores cadastrados;
- O usuario deve poder listar os dias de um mes com horario disponivel de um prestador;
- O usuario deve poder listar horarios disponiveis em um dia especifico de um prestador;
- O usuario deve poder realizar um novo agendamento com um prestador;

***RNF** - requisitos não funcionais
- A listagem deve ser armazenda em cache - forma de guardar um resultado para consumir de forma rápida;
-
**RN** - regra de negócio
- Todo agendamento deve durar 1 hora exatamente;
- os agendamentos devem estar disponiveis entre 8h e 18h (primeiro as 8h e ultimo as 17h);
- O usuario não pode agendar num horario já agendado;
- O usuario não pode agendar num horario já passou;
- O usuario não pode agendar com ele mesmo;

