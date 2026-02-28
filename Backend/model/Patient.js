const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  contact: { type: String, required: true },
  address: String,
  medicalHistory: [
    {
      symptoms: String,
      diagnosis: String,
      medicines: [String],
      ai_suggestion: String,
      date: { type: Date, default: Date.now }
    }
  ],
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
}, { timestamps: true });

module.exports = mongoose.model('Patient', PatientSchema, 'patients_records');