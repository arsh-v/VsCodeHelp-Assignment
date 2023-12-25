const mongoose = require("mongoose");
const { slotSchema } = require("./slots");

// Schema for clinics associated with a doctor
const clinicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  slots: [slotSchema], // Embedding the slot schema to create an array of slots for each clinic
});

const Clinic = mongoose.model("Clinic", clinicSchema);

module.exports = {Clinic, clinicSchema}