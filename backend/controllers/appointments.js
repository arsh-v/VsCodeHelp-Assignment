const { Appointment, User, Slot, Doctor, Clinic } = require("../models");
const nodemailer = require("nodemailer");

// Get all appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new appointment
const addAppointment = async (req, res) => {
  const user = req.session.userId;
  const appointment = new Appointment({ ...req.body, user });
  try {
    const newAppointment = await appointment.save();
    const fetchedUser = await User.findById(user);
    const { email } = fetchedUser;
    const fetchedDoctor = await Doctor.findById(req.body.doctor).populate('clinics.slots');
    console.log(fetchedDoctor);
    const { name: doctorName } = fetchedDoctor;
    const clinic = fetchedDoctor.clinics.find(
      (clinic) => clinic._id.toString() === req.body.clinic
    );
    console.log(clinic);
    const { name: clinicName } = clinic;
    const slot = clinic.slots.find(
      (slot) => slot._id.toString() === req.body.slot
    );
    console.log(slot);
    let { date, startTime: time } = slot;
    date = new Date(date).toDateString();


    // Create a transporter for nodemailer
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: "Booking Confirmation",
      text: `Your appointment has been booked with ${doctorName} at ${clinicName} on ${date} at ${time}.`,
    });
    transporter.close();

    slot.isBooked = true;
    await fetchedDoctor.save();

    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an appointment
const updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(updatedAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAppointments,
  getAppointmentById,
  addAppointment,
  updateAppointment,
  deleteAppointment,
};
