const Joi = require('joi');

const usuarioSchema = Joi.object({
  nome: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
  tipo: Joi.string().valid('Admin', 'Funcionario').required()
});

module.exports = { usuarioSchema };
