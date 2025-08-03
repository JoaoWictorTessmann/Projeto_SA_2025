const db = require('../db');
const jwt = require('jsonwebtoken');

const SECRET = 'sua_chave_secreta'; // Ideal: usar variável de ambiente

const login = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
  }

  const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
  db.query(sql, [email, senha], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) {
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }

    const usuario = results[0];
    const token = jwt.sign(
      { id: usuario.id, tipo: usuario.tipo },
      SECRET,
      { expiresIn: '2h' }
    );

    res.json({ mensagem: 'Login bem-sucedido!', token });
  });
};

module.exports = { login };
