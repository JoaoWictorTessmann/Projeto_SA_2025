// Importa o framework Express para criar o servidor HTTP
const express = require('express');

// Importa o middleware CORS para permitir requisições de outros domínios (ex: frontend separado)
const cors = require('cors');

// Carrega as variáveis de ambiente do arquivo .env (como DB_HOST, DB_USER etc.)
require('dotenv').config();

// Cria uma instância do aplicativo Express
const app = express();

// Aplica o middleware CORS para permitir que o frontend acesse a API
app.use(cors());

// Aplica o middleware para interpretar o corpo das requisições como JSON
// Isso permite que você envie dados via POST/PUT em formato JSON
app.use(express.json());

// Importa as rotas de usuários que estão definidas em Routes/usuarios.js
const usuariosRoutes = require('./Routes/usuarios');

// Define que todas as rotas que começam com "/usuarios" serão tratadas pelo router importado
// Exemplo: GET /usuarios → vai cair na rota definida em usuarios.js
app.use('/usuarios', usuariosRoutes);

// Importa as rotas de clientes
const clientesRoutes = require('./Routes/clientes');

// Define que todas as rotas que começam com "/clientes" serão tratadas pelo router importado
// Exemplo: GET /clientes → vai cair na rota definida em clientes.js
app.use('/clientes', clientesRoutes);

// Importa as rotas de pedidos que estão definidas em Routes/pedidos.js
const pedidosRoutes = require('./Routes/pedidos');

// Define que todas as rotas que começam com "/pedidos" serão tratadas pelo router importado
// Exemplo: GET /pedidos ou POST /pedidos → vão cair nas rotas definidas em pedidos.js
app.use('/pedidos', pedidosRoutes);

const authRoutes = require('./Routes/auth');
app.use('/auth', authRoutes);


// Inicia o servidor na porta 3000
// Quando o servidor estiver rodando, exibe uma mensagem no console
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
