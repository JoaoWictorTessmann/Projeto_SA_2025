const express = require('express');
const router = express.Router();
const {
  listarClientes,
  cadastrarCliente
} = require('../Controllers/clientesController');


// Rota GET → lista clientes
router.get('/', listarClientes);

// Rota POST → cadastra cliente
router.post('/', cadastrarCliente);

module.exports = router;
