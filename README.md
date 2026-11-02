# 📝 Blog Node

Blog simples construído com **Node.js**, **Express** e **EJS**, seguindo o padrão **MVC** (Model, View, Controller). Permite listar posts, ler um post completo e publicar novos posts por meio de um formulário.

Projeto de estudo focado em entender o fluxo de uma aplicação web server-side: rota → controller → model → view renderizada no servidor.

---

## 🚀 Tecnologias

| Tecnologia | Uso |
|---|---|
| [Node.js](https://nodejs.org/) | Ambiente de execução JavaScript |
| [Express 5](https://expressjs.com/) | Servidor HTTP e roteamento |
| [EJS 7](https://ejs.co/) | Template engine para renderizar HTML no servidor |
| [Nodemon](https://nodemon.io/) | Reinício automático do servidor em desenvolvimento |

---

## ✨ Funcionalidades

- 📄 Listagem dos posts na página inicial, com prévia de até 200 caracteres
- 🔎 Página de detalhe de cada post, com data de publicação (e de atualização, quando houver)
- ✍️ Formulário para criar um novo post (título e conteúdo obrigatórios)
- 🚫 Resposta **404** quando o post não existe
- 📱 Layout responsivo, com CSS próprio e sem frameworks

---

## 📂 Estrutura do projeto

```
blog-node/
├── src/
│   ├── controllers/
│   │   └── postsController.js   # Lógica de cada rota
│   ├── models/
│   │   └── postModel.js         # Acesso aos dados dos posts
│   ├── views/
│   │   ├── index.ejs            # Lista de posts
│   │   ├── post.ejs             # Detalhe de um post
│   │   └── new.ejs              # Formulário de novo post
│   ├── routes.js                # Definição das rotas
│   └── index.js                 # Configuração do Express e inicialização
├── package.json
└── .gitignore
```

### Fluxo de uma requisição

```
Navegador → routes.js → postsController → postModel → view (.ejs) → HTML de volta ao navegador
```

---

## 🛣️ Rotas

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/` | Lista todos os posts |
| `GET` | `/posts/new` | Exibe o formulário de novo post |
| `GET` | `/posts/:id` | Exibe um post específico |
| `POST` | `/posts` | Cria um post e redireciona para ele |

---

## ⚙️ Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- npm

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/Jorge-Gabriel97/Blog-Node.git

# 2. Entre na pasta
cd Blog-Node

# 3. Instale as dependências
npm install

# 4. Rode em modo de desenvolvimento
npm run dev
```

Acesse **http://localhost:3000** no navegador.

### Porta personalizada

A porta pode ser definida pela variável de ambiente `PORT` (padrão: `3000`):

```bash
PORT=8080 npm run dev
```

---

## 🔐 Boas práticas de segurança aplicadas

- **Proteção contra XSS:** o conteúdo dos posts é exibido com `<%= %>`, que faz o *escape* do HTML. Se alguém publicar `<script>...</script>`, o texto aparece na tela, mas não é executado.
- **Configuração via variáveis de ambiente:** a porta vem de `process.env.PORT`, e o arquivo `.env` está no `.gitignore` para que nenhuma configuração sensível seja enviada ao GitHub.
- **Validação no formulário:** os campos título e conteúdo são obrigatórios (`required`).

---

## ⚠️ Limitações atuais

- Os posts ficam **armazenados em memória** (um array no `postModel.js`). Ao reiniciar o servidor, os posts criados são perdidos e voltam apenas os dois posts de exemplo.
- O model já possui os métodos `updatePost` e `deletePost`, mas ainda **não existem rotas nem telas** para editar ou excluir posts.
- A validação dos campos acontece apenas no navegador; o servidor ainda não valida o corpo da requisição.

---

## 🗺️ Próximos passos

- [ ] Rotas e telas para **editar** e **excluir** posts
- [ ] Validação dos dados também no **servidor**
- [ ] Persistência em banco de dados (PostgreSQL ou MySQL)
- [ ] Extrair o CSS repetido das views para um arquivo em `public/`
- [ ] Usar *partials* do EJS para o cabeçalho e o rodapé
- [ ] Autenticação para restringir quem pode publicar

---

## 👨‍💻 Autor

**Jorge Gabriel Gomes Amparo** — Desenvolvedor Full Stack

[![GitHub](https://img.shields.io/badge/GitHub-Jorge--Gabriel97-181717?logo=github)](https://github.com/Jorge-Gabriel97)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Jorge%20Gabriel-0A66C2?logo=linkedin)](https://linkedin.com/in/jorge-gabriel-579605228)
[![Portfólio](https://img.shields.io/badge/Portf%C3%B3lio-Acessar-ea580c)](https://wwwjorgegabrielcombr.vercel.app/)
