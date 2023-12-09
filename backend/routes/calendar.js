const express = require("express");
const router = express.Router();
const calendarController = require("../dataBaseController/calendarController");

// Route to create a new calendar
router.post("/calendars", calendarController.createCalendar);

// Route to get all calendars
router.get("/calendars", calendarController.getAllCalendars);

// Route to get a specific calendar by ID
router.get("/calendars/:id", calendarController.getCalendarById);

// Route to update a calendar by ID
router.put("/calendars/:id", calendarController.updateCalendarById);

// Route to delete a calendar by ID
router.delete("/calendars/:id", calendarController.deleteCalendarById);

// Route to get assignments belonging to a specific calendar
router.get(
  "/calendars/:calendarId/assignments",
  calendarController.getAssignmentsByCalendar
);

module.exports = router;
