const db = require('../db');
const bcrypt = require('bcrypt');
const { usuarioSchema } = require('../Validators/usuarioValidator');

// Listar todos os usuários
const listarUsuarios = (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Cadastrar novo usuário com validação e hash
const cadastrarUsuario = async (req, res) => {
  const { error, value } = usuarioSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ erro: error.details[0].message });
  }

  const { nome, email, senha, tipo } = value;

  try {
    const hash = await bcrypt.hash(senha, 10);
    const sql = 'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)';
    db.query(sql, [nome, email, hash, tipo], (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!', id: result.insertId });
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao gerar hash da senha.' });
  }
};

module.exports = {
  listarUsuarios,
  cadastrarUsuario
};
