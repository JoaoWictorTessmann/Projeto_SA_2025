const Joi = require('joi');

const pedidoSchema = Joi.object({
  cliente_id: Joi.number().integer().positive().required(),
  produto: Joi.string().min(2).max(100).required(),
  quantidade: Joi.number().integer().min(1).required(),
  valor: Joi.number().precision(2).min(0).required()
});
