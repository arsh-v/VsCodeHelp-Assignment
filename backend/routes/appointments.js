const express = require("express");
const router = express.Router();

// Import controllers and validators
const {
  getAppointments,
  getAppointmentById,
  addAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointments");
const {
  appointmentSchema,
  appointmentUpdateSchema,
} = require("../validators/appointments");
const validateSchema = require("../middleware/validator");
const isAuthenticated = require("../middleware/auth");

// Routes
router.get("/", getAppointments);
router.get("/:id", getAppointmentById);
router.post("/", isAuthenticated, validateSchema(appointmentSchema), addAppointment);
router.put("/:id", validateSchema(appointmentUpdateSchema), updateAppointment);
router.delete("/:id", deleteAppointment);

module.exports = router;
