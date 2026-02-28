const express = require('express');
const router = express.Router();

// Controllers Import
const { register, login } = require('../controllers/authController');
// const { addPatient, getPatients } = require('../controllers/patientController');
const { bookAppointment, getDoctorAppointments } = require('../controllers/appointmentController');
// const { createPrescription, getPatientHistory } = require('../controllers/prescriptionController');

// Middleware Import (Security ke liye)
const auth = require('../middleware/auth');

// --- AUTH ROUTES ---
router.post('/register', register);
router.post('/login', login);

// --- PATIENT ROUTES ---
// auth middleware lagaya hai taake sirf logged-in users hi access karein
// router.post('/patients/add', auth, addPatient);
router.get('/patients/all', auth, getPatients);

// --- APPOINTMENT ROUTES ---
router.post('/appointments/book', auth, bookAppointment);
router.get('/appointments/doctor-list', auth, getDoctorAppointments);

// --- PRESCRIPTION ROUTES ---
router.post('/prescriptions/add', auth, createPrescription);
router.get('/prescriptions/history/:patientId', auth, getPatientHistory);

module.exports = router;