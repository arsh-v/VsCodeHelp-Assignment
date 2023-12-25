const { Doctor } = require("../models");

// Get all doctors
const getDoctors = async (req, res) => {
  try {
    let doctors = await Doctor.find().populate("clinics.slots");
    const now = new Date();

    doctors = doctors.map((doctor) => {
      let nextAvailableSlot = null;
      let clinicAddress = "";

      // Iterate through clinics to find the next available slot
      for (const clinic of doctor.clinics) {
        for (const slot of clinic.slots) {
          const slotDateTime = new Date(slot.date);
          const [hours, minutes] = slot.startTime.split(":").map(Number);
          slotDateTime.setHours(hours, minutes, 0, 0);

          // Check if the slot is in the future and not booked
          if (slotDateTime > now && !slot.isBooked) {
            nextAvailableSlot = {
              ...slot.toObject(), // Convert Mongoose sub-document to a plain object
              dateTime: slotDateTime, // Include the date and time of the slot
            };
            clinicAddress = clinic.address;
            break; // Break out of the inner loop once the next available slot is found
          }
        }
        if (nextAvailableSlot) break; // Break out of the outer loop as well
      }

      return {
        ...doctor.toObject(), // Convert Mongoose model instance to a plain object
        nextAvailableSlot: nextAvailableSlot
          ? {
              ...nextAvailableSlot,
              timeString: nextAvailableSlot.dateTime.toLocaleTimeString(
                "en-US",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }
              ),
              dateString:
                nextAvailableSlot.dateTime.toLocaleDateString("en-US"),
            }
          : null,
        clinicAddress,
      };
    });

    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single doctor by id
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new doctor
const addDoctor = async (req, res) => {
  const doctor = Doctor(req.body);
  try {
    const newDoctor = await doctor.save();
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a doctor
const updateDoctor = async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDoctor)
      return res.status(404).json({ message: "Doctor not found" });
    res.json(updatedDoctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a doctor
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json({ message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a clinic to a doctor
const addClinic = async (req, res) => {
  const doctorId = req.params.doctorId;
  const clinicData = req.body;

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    doctor.clinics.push(clinicData);
    await doctor.save();

    res.status(201).json({ message: "Clinic added successfully", doctor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a clinic from a doctor
const deleteClinic = async (req, res) => {
  const doctorId = req.params.doctorId;
  const clinicId = req.params.clinicId;

  try {
    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      {
        $pull: { clinics: { _id: clinicId } },
      },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ message: "Doctor or clinic not found" });
    }

    res.json({ message: "Clinic deleted successfully", doctor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getDoctors,
  getDoctorById,
  addDoctor,
  updateDoctor,
  deleteDoctor,
  addClinic,
  deleteClinic,
};
