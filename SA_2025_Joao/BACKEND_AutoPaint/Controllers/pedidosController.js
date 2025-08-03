const db = require('../db');
const { pedidoSchema } = require('../Validators/pedidoValidator');
const { statusSchema } = require('../Validators/statusValidator');

// ...listarPedidos e cadastrarPedido já definidos

// Atualizar status do pedido
const atualizarStatusPedido = async (req, res) => {
  const { id } = req.params;
  const { error, value } = statusSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ erro: error.details[0].message });
  }

  const { status } = value;

  try {
    const sql = 'UPDATE pedidos SET status = ? WHERE id = ?';
    db.query(sql, [status, id], (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) {
        return res.status(404).json({ erro: 'Pedido não encontrado.' });
      }
      res.json({ mensagem: 'Status atualizado com sucesso!' });
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar status do pedido.' });
  }
};

module.exports = {
  listarPedidos,
  cadastrarPedido,
  atualizarStatusPedido
};
