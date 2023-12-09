const express = require("express");
const router = express.Router();
const assignmentController = require("../dataBaseController/assignmentController");

// Route to create a new assignment and associate it with a calendar
router.post("/assignments", assignmentController.createAssignment);

// Route to get all assignments
router.get("/assignments", assignmentController.getAllAssignments);

// Route to get assignments by a specific calendar ID
router.get(
  "/calendars/:calendarId/assignments",
  assignmentController.getAssignmentsByCalendar
);

// Route to update an assignment by its ID
router.put("/assignments/:id", assignmentController.updateAssignmentById);

// Route to delete an assignment by its ID
router.delete("/assignments/:id", assignmentController.deleteAssignmentById);

module.exports = router;
