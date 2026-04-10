const eventModel = require("../models/Event");

class EventService {
  async createEvent(eventData) {
    try {
      const event = new eventModel({
        ...eventData,
        remainingcapacity: eventData.Maxcapacity
      });
      await event.save();
      return event;
    } catch (error) {
      throw error;
    }
  }

  async getAllEvents() {
    try {
      return await eventModel.find();
    } catch (error) {
      throw error;
    }
  }

  async getEventById(eventId) {
    try {
      return await eventModel.findById(eventId);
    } catch (error) {
      throw error;
    }
  }

  async updateEvent(eventId, updateData) {
    try {
      return await eventModel.findByIdAndUpdate(eventId, updateData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async deleteEvent(eventId) {
    try {
      return await eventModel.findByIdAndDelete(eventId);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new EventService();
