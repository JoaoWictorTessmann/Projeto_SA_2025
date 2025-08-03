const Joi = require('joi');

const clienteSchema = Joi.object({
  nome: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  telefone: Joi.string().pattern(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/).required(),
  endereco: Joi.string().min(5).max(200).required()
});

module.exports = { clienteSchema };
