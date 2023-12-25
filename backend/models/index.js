// models/index.js

const { User } = require("./users");
const { Doctor } = require("./doctors");
const { Appointment } = require("./appointments");
const { Clinic } = require("./clinics");
const { Slot } = require("./slots");

module.exports = {
  User,
  Doctor,
  Appointment,
  Clinic,
  Slot,
};
