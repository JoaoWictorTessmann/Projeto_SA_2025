const express = require('express');
const router = express.Router();
const {
  listarPedidos,
  cadastrarPedido
} = require('../Controllers/pedidosController');


// Rota GET → lista pedidos
router.get('/', listarPedidos);

// Rota POST → cadastra pedido
router.post('/', cadastrarPedido);

// Atualizar status de um pedido
router.put('/:id/status', atualizarStatusPedido);

module.exports = router;
