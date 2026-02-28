const Appointment = require('../model/Appointment');

// 1. Appointment Book Karna
exports.bookAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date, time, reason } = req.body;
    
    const newAppt = new Appointment({
      patient: patientId,
      doctor: doctorId,
      date,
      time,
      reason
    });

    await newAppt.save();
    res.status(201).json({ msg: "Appointment booked successfully", data: newAppt });
  } catch (err) {
    res.status(500).json({ msg: "Booking mein error aya" });
  }
};

// 2. Doctor ke liye Appointments Fetch Karna
exports.getDoctorAppointments = async (req, res) => {
  try {
    // .populate se patient ka naam aur contact bhi mil jayega sirf ID ke bajaye
    const appointments = await Appointment.find({ doctor: req.user.id })
      .populate('patient', ['name', 'contact'])
      .sort({ date: 1 });
    
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ msg: "Appointments fetch nahi ho saki" });
  }
};