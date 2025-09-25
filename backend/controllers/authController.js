const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../config/token.js');

const handleSignup = async (req, res) => {
  try {
    let { username, email, password, role } = req.body;
    username = username?.trim();
    email = email?.trim().toLowerCase();
    password = password?.trim();

    if (!username || !email || !password) 
      return res.status(400).json({ message: "All fields are required" });

    const emailExists = await User.findOne({ email });
    if (emailExists) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, role: "user" });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: "Server error" });
  }
}

const handleLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email?.trim().toLowerCase();
    password = password?.trim();

    if (!email || !password) 
      return res.status(400).json({ message: "Email and password required" });

    const emailExists = await User.findOne({ email });
    if (!emailExists) return res.status(400).json({ message: "Invalid email or password" });

    const isPasswordValid = await bcrypt.compare(password, emailExists.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(emailExists._id, emailExists.role);
    return res.cookie('token', token, { httpOnly: true, sameSite: 'Strict' })
      .status(200)
      .json({ message: "Login successful", token });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { handleSignup, handleLogin };
