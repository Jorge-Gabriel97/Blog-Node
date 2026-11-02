# 📝 Blog Node

Blog full stack com **API REST em Node.js + Express** e **front-end em React + TypeScript**. Permite listar posts, ler um post completo, publicar novos posts e gerenciar tudo por um painel de administração (criar, editar e excluir).

Projeto de estudo que começou como uma aplicação server-side com EJS e evoluiu para uma arquitetura separada: o Express expõe uma API JSON e o React cuida de toda a interface.

---

## 🚀 Tecnologias

### Back-end

| Tecnologia | Uso |
|---|---|
| [Node.js](https://nodejs.org/) | Ambiente de execução JavaScript |
| [Express 5](https://expressjs.com/) | API REST e roteamento |
| [Nodemon](https://nodemon.io/) | Reinício automático do servidor em desenvolvimento |

### Front-end

| Tecnologia | Uso |
|---|---|
| [React 19](https://react.dev/) | Construção da interface com componentes |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática do código do front |
| [React Router](https://reactrouter.com/) | Navegação entre páginas sem recarregar |
| [Vite](https://vite.dev/) | Servidor de desenvolvimento e build |

---

## ✨ Funcionalidades

- 📄 Página inicial com destaque para o post mais recente e grade de cards com prévia e tempo de leitura
- 🔎 Página de leitura de cada post, com data de publicação e de atualização
- ✍️ Formulário para criar e editar posts, com validação e contador de palavras
- 🛠️ Painel de administração com listagem, edição e exclusão (com diálogo de confirmação)
- 🚫 Página **404** para rotas e posts inexistentes
- 📱 Layout **responsivo**: menu hambúrguer no celular, grade de 1 a 3 colunas e tabela do admin que vira cards em telas pequenas
- 🌙 **Tema escuro** automático, seguindo a preferência do sistema
- ♿ Acessibilidade: link "pular para o conteúdo", foco visível, rótulos ARIA e respeito ao `prefers-reduced-motion`

---

## 📂 Estrutura do projeto

```
blog-node/
├── src/                         # Back-end (API)
│   ├── controllers/
│   │   └── postsController.js   # Lógica e validação de cada rota
│   ├── models/
│   │   └── postModel.js         # Acesso aos dados dos posts
│   ├── routes.js                # Definição das rotas da API
│   └── index.js                 # Configuração do Express e inicialização
├── client/                      # Front-end (React + TypeScript)
│   ├── src/
│   │   ├── components/          # Layout, PostCard, PostForm, ConfirmDialog...
│   │   ├── hooks/               # useFetch, useDocumentTitle
│   │   ├── pages/               # Uma página por rota
│   │   ├── utils/               # Formatação de datas e textos
│   │   ├── api.ts               # Funções que chamam a API
│   │   ├── types.ts             # Tipos compartilhados (Post, PostInput)
│   │   ├── App.tsx              # Rotas do front
│   │   └── index.css            # Estilos globais e responsividade
│   ├── index.html
│   └── vite.config.ts           # Proxy de /api para o Express em desenvolvimento
├── package.json
└── .gitignore
```

### Fluxo de uma requisição

```
React (página) → api.ts → fetch /api/... → routes.js → postsController → postModel → JSON → React atualiza a tela
```

---

## 🛣️ Rotas

### API

| Método | Rota | Descrição | Resposta |
|---|---|---|---|
| `GET` | `/api/posts` | Lista os posts (mais recentes primeiro) | `200` |
| `GET` | `/api/posts/:id` | Retorna um post | `200` / `404` |
| `POST` | `/api/posts` | Cria um post | `201` / `400` |
| `PUT` | `/api/posts/:id` | Atualiza um post | `200` / `400` / `404` |
| `DELETE` | `/api/posts/:id` | Exclui um post | `204` / `404` |

Corpo esperado no `POST` e no `PUT`:

```json
{ "title": "Meu post", "content": "Conteúdo do post" }
```

### Front-end

| Rota | Página |
|---|---|
| `/` | Lista de posts |
| `/posts/:id` | Leitura de um post |
| `/posts/new` | Novo post |
| `/admin` | Painel de administração |
| `/admin/edit/:id` | Edição de um post |

---

## ⚙️ Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 22.22 ou superior
- npm

### Desenvolvimento

```bash
# 1. Clone o repositório
git clone https://github.com/Jorge-Gabriel97/Blog-Node.git

# 2. Entre na pasta
cd Blog-Node

# 3. Instale as dependências (instala também as da pasta client/)
npm install

# 4. Sobe a API e o front ao mesmo tempo
npm run dev
```

Acesse **http://localhost:5173** no navegador. O Vite repassa as chamadas `/api` para o Express, que roda na porta `3000`.

### Produção

```bash
npm run build   # gera o front compilado em client/dist
npm start       # o Express serve a API e o front na mesma porta
```

Acesse **http://localhost:3000**.

### Porta personalizada

A porta da API pode ser definida pela variável de ambiente `PORT` (padrão: `3000`):

```bash
PORT=8080 npm start
```

---

## 🔐 Boas práticas de segurança aplicadas

- **Proteção contra XSS:** o React faz o *escape* de todo texto renderizado com `{ }`. Se alguém publicar `<script>...</script>`, o texto aparece na tela, mas não é executado.
- **Validação no servidor:** a API rejeita com `400` posts sem título ou conteúdo, mesmo que a validação do front seja burlada.
- **Configuração via variáveis de ambiente:** a porta vem de `process.env.PORT`, e o arquivo `.env` está no `.gitignore`.

---

## ⚠️ Limitações atuais

- Os posts ficam **armazenados em memória** (um array no `postModel.js`). Ao reiniciar o servidor, os posts criados são perdidos e voltam apenas os dois posts de exemplo.
- O painel de administração **não tem autenticação**: qualquer pessoa com acesso ao site pode criar, editar e excluir posts.

---

## 🗺️ Próximos passos

- [x] Rotas e telas para **editar** e **excluir** posts
- [x] Validação dos dados também no **servidor**
- [x] Front-end em **React + TypeScript** com layout responsivo
- [ ] Persistência em banco de dados (PostgreSQL ou MySQL)
- [ ] Autenticação para restringir o acesso ao painel de administração
- [ ] Testes automatizados da API e dos componentes

---

## 👨‍💻 Autor

**Jorge Gabriel Gomes Amparo** — Desenvolvedor Full Stack

[![GitHub](https://img.shields.io/badge/GitHub-Jorge--Gabriel97-181717?logo=github)](https://github.com/Jorge-Gabriel97)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Jorge%20Gabriel-0A66C2?logo=linkedin)](https://linkedin.com/in/jorge-gabriel-579605228)
[![Portfólio](https://img.shields.io/badge/Portf%C3%B3lio-Acessar-ea580c)](https://wwwjorgegabrielcombr.vercel.app/)
