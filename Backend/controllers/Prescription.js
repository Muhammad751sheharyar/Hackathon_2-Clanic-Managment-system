const Prescription = require('../model/Prescription');

// 1. Nayi Prescription Create Karna
exports.createPrescription = async (req, res) => {
  try {
    const { patientId, medicines, instructions, diagnosis } = req.body;
    
    const newPrescription = new Prescription({
      patient: patientId,
      doctor: req.user.id, // Doctor ki ID token se ayegi
      medicines, // Ye ek array hogi e.g. ["Panadol", "Brufen"]
      instructions,
      diagnosis
    });

    await newPrescription.save();
    res.status(201).json({ msg: "Prescription saved!", data: newPrescription });
  } catch (err) {
    res.status(500).json({ msg: "Prescription save nahi ho saki" });
  }
};

// 2. Patient ki History (Saari Purani Prescriptions)
exports.getPatientHistory = async (req, res) => {
  try {
    const { patientId } = req.params;
    const history = await Prescription.find({ patient: patientId })
      .populate('doctor', ['name'])
      .sort({ createdAt: -1 });
      
    res.json(history);
  } catch (err) {
    res.status(500).json({ msg: "History fetch karne mein masla hua" });
  }
};