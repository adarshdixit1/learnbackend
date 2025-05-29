const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { secretKey } = require("../config/secrets");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const authController = {
  async login(req, res) {
    const { username, password } = req.body;
    const user = ""
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res.status(401).send("Invalid credentials");
    }
    const token = jwt.sign({ userId: user.username }, secretKey, {
      expiresIn: "1h",
    });
    req.session.user = username;
    res.status(200).send({ token });
  },

  async signUp(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .send({ error: "Username and password are required" });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user instance and save it to MongoDB
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      res.status(201).send({ message: "User signed up successfully" });
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).send({ error: "Internal server error" });
    }
  },

  // for logout
  async logout(req, res) {
    req.session.destroy((err) => {
      if (err) return res.status(500).send("Error logging out");
      res.send("User logged out successfully!");
    });
  },
};

module.exports = authController;
