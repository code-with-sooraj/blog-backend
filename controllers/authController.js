const User = require("../models/User.js");
const { generateToken } = require("../config/jwt.js");
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });
    res.status(201).json({ token: generateToken(user._id), user });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({ token: generateToken(user._id), user });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
};

module.exports = {
    signup,
    login
};
