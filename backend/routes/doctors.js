const express = require("express");
const router = express.Router();
const validateSchema = require("../middleware/validator");
const {
  doctorSchema,
  clinicSchema,
  // slotSchema,
} = require("../validators/doctors");

const {
  getDoctors,
  getDoctorById,
  addDoctor,
  updateDoctor,
  deleteDoctor,
  addClinic,
  deleteClinic,
} = require("../controllers/doctors");

// Doctor CRUD
router.get("/", getDoctors);
router.get("/:id", getDoctorById);
router.post("/", validateSchema(doctorSchema), addDoctor);
router.put("/:id", validateSchema(doctorSchema), updateDoctor);
router.delete("/:id", deleteDoctor);

// Clinic operations
router.post("/:doctorId/clinics", validateSchema(clinicSchema), addClinic);
router.delete("/:doctorId/clinics/:clinicId", deleteClinic);

// // Slot operations
// router.post(
//   "/:doctorId/clinics/:clinicId/slots",
//   validateSchema(slotSchema),
//   addSlot
// );
// router.delete("/:doctorId/clinics/:clinicId/slots/:slotId", deleteSlot);

module.exports = router;
