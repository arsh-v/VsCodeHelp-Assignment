const Joi = require("joi");

// Schema for Doctor
const doctorSchema = Joi.object({
  name: Joi.string().trim().required(),
  specialty: Joi.string().trim().required(),
  fees: Joi.number().required(),
  // Add any additional fields as necessary
});

// Schema for Clinic
const clinicSchema = Joi.object({
  name: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
  // ... other clinic fields ...
});

// // Schema for Slot
// const slotSchema = Joi.object({
//   day: Joi.string()
//     .valid(
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//       "Sunday",
//     )
//     .required(),
//   startTime: Joi.string()
//     .pattern(new RegExp("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"))
//     .required(),
//   // endTime: Joi.string()
//   //   .pattern(new RegExp("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"))
//   //   .required(),
// });

module.exports = {
  doctorSchema,
  clinicSchema,
  // slotSchema,
};
