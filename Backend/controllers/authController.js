const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- REGISTER (SIGNUP) LOGIC ---
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // 1. Check karein ke user pehle se exist to nahi karta
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists with this email" });
    }

    // 2. Naya user instance banayein
    user = new User({
      name,
      email,
      password,
      role: role || 'Patient' // Agar role nahi bheja to default Patient
    });

    // 3. Password ko hash (encrypt) karein
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // 4. Database mein save karein
    await user.save();

    // 5. JWT Token generate karein
    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });

  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).send("Server Error during Registration");
  }
};

// --- LOGIN LOGIC ---
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Email check karein
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials (User not found)" });
    }

    // 2. Password match karein
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials (Wrong Password)" });
    }

    // 3. Token generate karein
    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscription: user.subscription
      }
    });

  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).send("Server Error during Login");
  }
};