const Joi = require("joi");

const appointmentSchema = Joi.object({
  doctor: Joi.string().trim().required(),
  clinic: Joi.string().trim().required(),
  slot: Joi.string().trim().required(),
});

const appointmentUpdateSchema = Joi.object({
  doctor: Joi.string().trim(),
  clinic: Joi.string().trim(),
  slot: Joi.string().trim(),
  status: Joi.string().valid("booked", "completed", "cancelled", "no-show"),
}).min(1);

module.exports = {
  appointmentSchema,
  appointmentUpdateSchema,
};
