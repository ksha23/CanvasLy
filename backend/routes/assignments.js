const express = require("express");
const router = express.Router();
const assignmentController = require("../dataBaseController/assignmentController");

// Route to create a new assignment and associate it with a calendar
// router.post("/assignments", async (req, res) => {
//   assignmentController.createAssignments(req.params.calendarId);
// });

// Route to get all assignments
// router.get("/assignments", assignmentController.getAssignmentsByCalendarId);

// Route to update an assignment by its ID
router.put("/assignments/:id", async (req, res) => {
  await assignmentController.completeAssignmentById(req.params.id);
});

module.exports = router;
