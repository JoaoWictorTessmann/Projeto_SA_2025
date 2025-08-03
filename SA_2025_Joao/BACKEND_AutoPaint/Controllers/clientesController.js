const db = require('../db');
const { clienteSchema } = require('../Validators/clienteValidator');

// Listar todos os clientes
const listarClientes = (req, res) => {
  db.query('SELECT * FROM clientes', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Cadastrar novo cliente
const cadastrarCliente = async (req, res) => {
  const { error, value } = clienteSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ erro: error.details[0].message });
  }

  const { nome, email, telefone, endereco } = value;

  try {
    const sql = 'INSERT INTO clientes (nome, email, telefone, endereco) VALUES (?, ?, ?, ?)';
    db.query(sql, [nome, email, telefone, endereco], (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ mensagem: 'Cliente cadastrado com sucesso!', id: result.insertId });
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao cadastrar cliente.' });
  }
};

module.exports = {
  listarClientes,
  cadastrarCliente
};
