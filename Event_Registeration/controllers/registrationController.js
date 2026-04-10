const registrationModel = require("../models/Registration");
const eventModel = require("../models/Event");
const userModel = require("../models/User");

exports.registerUserToEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body;
    if (!userId || !eventId) {
      return res.status(400).json({ message: "User ID and Event ID are required" });
    }

    // Check if user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if event exists
    const event = await eventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if event has capacity
    if (event.remainingcapacity <= 0) {
      return res.status(400).json({ message: "Event is full" });
    }

    // Check if user already registered
    const existingRegistration = await registrationModel.findOne({ user: userId, event: eventId });
    if (existingRegistration) {
      return res.status(400).json({ message: "User already registered for this event" });
    }

    // Register user
    const registration = new registrationModel({ user: userId, event: eventId });
    await registration.save();

    // Decrease remaining capacity
    event.remainingcapacity -= 1;
    await event.save();

    res.status(201).json({ message: "Registration successful", registration });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      message: "Registration failed", 
      error: error.message || error.toString() 
    });
  }
};

exports.getRegistrationsByEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const registrations = await registrationModel.find({ event: eventId }).populate("user", "fullname email");
    res.status(200).json({ message: "Registrations retrieved successfully", registrations });
  } catch (error) {
    console.error("Get registrations error:", error);
    res.status(500).json({ 
      message: "Failed to retrieve registrations", 
      error: error.message || error.toString() 
    });
  }
};

exports.getRegistrationsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const registrations = await registrationModel.find({ user: userId }).populate("event", "title date location");
    res.status(200).json({ message: "User registrations retrieved successfully", registrations });
  } catch (error) {
    console.error("Get user registrations error:", error);
    res.status(500).json({ 
      message: "Failed to retrieve user registrations", 
      error: error.message || error.toString() 
    });
  }
};

exports.cancelRegistration = async (req, res) => {
  try {
    const registrationId = req.params.id;
    const registration = await registrationModel.findByIdAndDelete(registrationId);
    
    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    // Increase remaining capacity
    const event = await eventModel.findById(registration.event);
    if (event) {
      event.remainingcapacity += 1;
      await event.save();
    }

    res.status(200).json({ message: "Registration cancelled successfully" });
  } catch (error) {
    console.error("Cancel registration error:", error);
    res.status(500).json({ 
      message: "Failed to cancel registration", 
      error: error.message || error.toString() 
    });
  }
};
