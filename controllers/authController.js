const User = require("../models/User.js");
const { generateToken } = require("../config/jwt.js");
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);
  
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // send secure cookies only on https
        sameSite: "Strict", // CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
      })
      .status(201)
      .json({ user, message: "User created successfully" });
};  

const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.json({ status: 401, message: "Invalid Username" });
      }
  
      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({ status: 401, message: "Incorrect Passoword" });
      }
  
      // Generate JWT
      const token = generateToken(user._id);
  
      // Set cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
      });
  
      // Send response
      res.json({ status:200,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        message: "Login successful",
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error" });
    }
};  

module.exports = {
    signup,
    login
};
