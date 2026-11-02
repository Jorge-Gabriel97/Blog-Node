const express = require('express');
const path = require('node:path');
const router = require('./routes');

const app = express();

//Configuração para receber JSON no corpo das requisições
app.use(express.json())

//Configuração das rotas da API
app.use('/api', router)

//Rota de API inexistente
app.use('/api', (req, res) => res.status(404).json({ error: 'Rota não encontrada' }))

//Em produção, serve o front-end React já compilado (client/dist)
const clientDist = path.join(__dirname, '..', 'client', 'dist')
app.use(express.static(clientDist))
app.get('/{*splat}', (req, res) => res.sendFile(path.join(clientDist, 'index.html')))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
