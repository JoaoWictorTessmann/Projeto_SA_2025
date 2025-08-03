const Joi = require('joi');

const statusSchema = Joi.object({
  status: Joi.string().valid('Pendente', 'Em andamento', 'Concluído').required()
});

module.exports = { statusSchema };
