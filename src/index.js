const express = require('express');
const path = require('node:path');
const router = require('./routes');

const app = express();

//Configuração do EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//Configuração de arquivos estáticos
app.use(express.static('public'))

//Configuração para receber dados do formulário
app.use(express.urlencoded({ extended: true }))

//Configuração das rotas
app.use(router)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
