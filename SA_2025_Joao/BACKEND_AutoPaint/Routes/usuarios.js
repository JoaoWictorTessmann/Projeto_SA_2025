const express = require('express');
const router = express.Router();
const {
  listarUsuarios,
  cadastrarUsuario
} = require('../Controllers/usuariosController');

const { autenticar } = require('../Middleware/authMiddleware');

// Rota GET → protegida
router.get('/', autenticar, listarUsuarios);

// Rota POST → protegida também
router.post('/', autenticar, autorizarAdmin, cadastrarUsuario);

module.exports = router;
