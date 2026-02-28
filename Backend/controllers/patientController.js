const Patient = require('../model/Patient');

// 1. Naya Patient Add Karna
exports.addPatient = async (req, res) => {
  try {
    const { name, age, gender, contact, address } = req.body;
    const newPatient = new Patient({
      name, age, gender, contact, address,
      addedBy: req.user.id // Ye Auth middleware se ayega
    });
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(500).json({ msg: "Patient add karne mein masla hua" });
  }
};

// 2. Saare Patients ki List (Doctor/Receptionist ke liye)
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ msg: "Data fetch nahi ho saka" });
  }
};