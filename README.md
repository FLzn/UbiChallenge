<h1>Configuração Inicial</h1>

## Docker e Banco de dados
<ul>
  <li>Utilizando o docker, baixar a imagem do mysql com o comando: docker pull mysql</li>
  <li>criar um container com a imagem do mysql, exemplo: docker run --name challenge-ubistart -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql</li>
  <li>Rodar o container criado</li>
  <li>Adicionar uma nova conexão no dbeaver com mysql, colocando as informações do container criado acima</li>
  <li>Caso necessário, ir em "Driver properties" e mudar a chave "allowPublicKeyRetrieval" de false para true</li>
  <li>Dentro da conexão criada, criar um banco com o nome "challenge-ubi"</li>
</ul>

## Início do projeto
<ul>
  <li>Ao abrir o projeto, abra o terminal e dê o comando "npm i"</li>
  <li>No app module, mude o synchronize para true, digite "npm run start:dev" e depois volte para false</li>
  <li>Se necessário, mudar as configurações no .env</li>
</ul>

## Tecnologias utilizadas e por quê
<ul>
  <li>Foi utilizado no projeto o framework NestJS, em conjunto com o ORM TypeORM</li>
  <li>Utilizei a biblioteca "nestjs-typeorm-paginate" para auxiliar a paginação</li>
  <li>Utilizei a biblioteca "bcrypt" para encriptografar a senha do usuário</li>
  <li>Foi utilizado no projeto o banco de dados MySQL</li>
</ul>

## Para a utilização do projeto
<ul>
  <li>Ao inserir datas, o formato aceito pelo projeto é o de um timestamp, exemplo: "2021-04-11T13:34:00.000"</li>
  <li>
    As roles aceitas na criação do usuário são apenas: "user" ou "admin"
  </li>
  <li>
    Os status de TODO aceitos são: "Aberto", "Atrasado" ou "Finalizado
  </li>
</ul>

