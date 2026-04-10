const registrationModel = require("../models/Registration");
const eventModel = require("../models/Event");
const userModel = require("../models/User");

class RegistrationService {
  async registerUserToEvent(userId, eventId) {
    try {
      // Validate user exists
      const user = await userModel.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Validate event exists
      const event = await eventModel.findById(eventId);
      if (!event) {
        throw new Error("Event not found");
      }

      // Check capacity
      if (event.remainingcapacity <= 0) {
        throw new Error("Event is full");
      }

      // Check if already registered
      const existing = await registrationModel.findOne({ user: userId, event: eventId });
      if (existing) {
        throw new Error("User already registered for this event");
      }

      // Create registration
      const registration = new registrationModel({ user: userId, event: eventId });
      await registration.save();

      // Update capacity
      event.remainingcapacity -= 1;
      await event.save();

      return registration;
    } catch (error) {
      throw error;
    }
  }

  async getRegistrationsByEvent(eventId) {
    try {
      return await registrationModel.find({ event: eventId }).populate("user", "fullname email");
    } catch (error) {
      throw error;
    }
  }

  async getRegistrationsByUser(userId) {
    try {
      return await registrationModel.find({ user: userId }).populate("event", "title date location");
    } catch (error) {
      throw error;
    }
  }

  async cancelRegistration(registrationId) {
    try {
      const registration = await registrationModel.findByIdAndDelete(registrationId);
      if (!registration) {
        throw new Error("Registration not found");
      }

      // Restore capacity
      const event = await eventModel.findById(registration.event);
      if (event) {
        event.remainingcapacity += 1;
        await event.save();
      }

      return registration;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new RegistrationService();
