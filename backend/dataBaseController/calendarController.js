const { Calendar } = require("../models/calendar");

// create calendar if one with the same calendarId doesn't exist
const createCalendar = async (googleId, data) => {
  try {
    const calendar = await Calendar.findOne({ googleId: googleId });
    if (!calendar) {
      console.log("creating calendar since it doesn't exist");
      const newCalendar = await Calendar.create(data);
      return newCalendar;
    } else {
      return calendar;
    }
  } catch (error) {
    console.error(error);
  }
};

// Get all calendars
const getAllCalendars = async (req, res) => {
  try {
    const calendars = await Calendar.find();
    res.status(200).json(calendars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific calendar by ID
const getCalendarById = async (req, res) => {
  const { id } = req.params;
  try {
    const calendar = await Calendar.findById(id);
    if (!calendar) {
      return res.status(404).json({ message: "Calendar not found" });
    }
    res.status(200).json(calendar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a calendar by ID
const updateCalendarById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCalendar = await Calendar.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCalendar) {
      return res.status(404).json({ message: "Calendar not found" });
    }
    res.status(200).json(updatedCalendar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a calendar by ID
const deleteCalendarById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCalendar = await Calendar.findByIdAndDelete(id);
    if (!deletedCalendar) {
      return res.status(404).json({ message: "Calendar not found" });
    }
    res.status(200).json({ message: "Calendar deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCalendar,
  getAllCalendars,
  getCalendarById,
  updateCalendarById,
  deleteCalendarById,
};
