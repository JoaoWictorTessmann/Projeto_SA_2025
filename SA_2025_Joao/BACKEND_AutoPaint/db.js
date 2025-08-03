// Carrega as variáveis de ambiente do arquivo .env
// Isso permite usar DB_HOST, DB_USER, DB_PASS, DB_NAME sem expor dados sensíveis no código
require('dotenv').config();

// Importa o driver MySQL2 para conectar ao banco de dados MySQL
const mysql = require('mysql2');

// Cria uma conexão com o banco de dados usando os dados do .env
const db = mysql.createConnection({
  host: process.env.DB_HOST,       // Endereço do servidor MySQL (ex: localhost)
  user: process.env.DB_USER,       // Nome de usuário do banco
  password: process.env.DB_PASS,   // Senha do banco
  database: process.env.DB_NAME    // Nome do banco de dados
});

// Tenta estabelecer a conexão com o banco
db.connect((err) => {
  if (err) {
    // Se houver erro, exibe no console
    console.error('Erro ao conectar ao banco:', err);
  } else {
    // Se conectar com sucesso, exibe mensagem no console
    console.log('Conectado ao banco de dados!');
  }
});

// Exporta a conexão para que outros arquivos (como rotas) possam usá-la
module.exports = db;
