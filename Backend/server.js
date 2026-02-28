require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
// Server.js ke andar...
app.use('/api/auth', require('./routes/authRoutes'));
const PORT = process.env.PORT || 5000;
app.constructor

// [Image of MERN stack architecture diagram]

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));