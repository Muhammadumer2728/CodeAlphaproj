const userModel = require("../models/User");
const eventModel = require("../models/Event");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/Auth");
const { secret, expiresIn } = require("../config/jwt");

exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, phonenumber, password } = req.body.user || req.body;
    if (!fullname || !email || !phonenumber || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    else if (email.length < 5 || !email.includes("@")) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const user = new userModel({ 
      fullname, 
      email, 
      phonenumber, 
      password, 
      jwtToken: jwt.sign({ email }, secret, { expiresIn }) 
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      message: "User registration failed", 
      error: error.message || error.toString() 
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ message: "Users retrieved successfully", users });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ 
      message: "Failed to retrieve users", 
      error: error.message || error.toString() 
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User retrieved successfully", user });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ 
      message: "Failed to retrieve user", 
      error: error.message || error.toString() 
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ email }, secret, { expiresIn });
    user.jwtToken = token;
    await user.save();
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      message: "Login failed", 
      error: error.message || error.toString() 
    });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location, Maxcapacity } = req.body;
    if (!title || !description || !date || !location || !Maxcapacity) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const event = new eventModel({ 
      title, 
      description, 
      date, 
      location, 
      Maxcapacity,
      remainingcapacity: Maxcapacity 
    });
    await event.save();
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    console.error("Create event error:", error);
    res.status(500).json({ 
      message: "Failed to create event", 
      error: error.message || error.toString() 
    });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await eventModel.find();
    res.status(200).json({ message: "Events retrieved successfully", events });
  } catch (error) {
    console.error("Get all events error:", error);
    res.status(500).json({ 
      message: "Failed to retrieve events", 
      error: error.message || error.toString() 
    });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const event = await eventModel.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event retrieved successfully", event });
  } catch (error) {
    console.error("Get event error:", error);
    res.status(500).json({ 
      message: "Failed to retrieve event", 
      error: error.message || error.toString() 
    });
  }
};











