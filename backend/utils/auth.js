const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, getUser } = require("../helpers/firestore");

const router = express.Router();

// SIGNUP (REGISTER)
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existing = await getUser("users", email);
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Build user object
    const userData = {
      username,
      email,
      password_hash,
      created_at: new Date().toISOString(),
    };

    await createUser("users", userData);

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUser("users", email);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
