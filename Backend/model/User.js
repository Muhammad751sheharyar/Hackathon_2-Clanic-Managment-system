const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Admin', 'Doctor', 'Receptionist', 'Patient'], 
    default: 'Patient' 
  },
  subscription: { 
    type: String, 
    enum: ['Free', 'Pro'], 
    default: 'Free' 
  }
}, { timestamps: true });

// Teesra argument "my_clinic_users" wo naam hai jo MongoDB Compass mein nazar ayega
module.exports = mongoose.model('User', UserSchema, 'my_clinic_users');