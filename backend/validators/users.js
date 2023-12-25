const Joi = require("joi");

const sendOtpSchema = Joi.object({
  email: Joi.string().email().required(),
}).unknown(false);

const verifyOtpSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required(),
}).unknown(false);

module.exports = {
  sendOtpSchema,
  verifyOtpSchema
};
