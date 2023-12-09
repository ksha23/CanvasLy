const { Assignment, Calendar } = require("../models/calendar");

// create many assignments and associate them with a calendar
const createAssignments = async (calendarId, data) => {
  try {
    // only create assignments that don't already exist
    const existingAssignments = await Assignment.find({
      name: { $in: data.map((assignment) => assignment.name) },
    });
    const existingAssignmentNames = existingAssignments.map(
      (assignment) => assignment.name
    );
    data = data.filter(
      (assignment) => !existingAssignmentNames.includes(assignment.name)
    );

    const newAssignments = await Assignment.insertMany(data);

    if (calendarId) {
      const calendar = await Calendar.findOne({ googleCalendarId: calendarId });
      if (!calendar) {
        return res.status(404).json({ message: "Calendar not found" });
      }

      // Extract only the IDs of newly created assignments
      const assignmentIds = newAssignments.map((assignment) => assignment._id);
      // Add valid assignmentIds to the calendar's assignments field
      calendar.assignments.push(...assignmentIds);

      await calendar.save();
    }

    return newAssignments;
  } catch (error) {
    console.error(error);
  }
};

// Get assignments belonging to a specific calendar
const getAssignmentsByCalendarId = async (calendarId) => {
  try {
    const calendar = await Calendar.findOne({
      googleCalendarId: calendarId,
    }).populate("assignments");
    if (!calendar) {
      console.error("Calendar not found");
    }
    return calendar.assignments;
  } catch (error) {
    console.error(error);
  }
};

// Update an assignment by ID
const completeAssignmentById = async (id) => {
  try {
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );
    if (!updatedAssignment) {
      console.error("Assignment not found");
    }
    return updatedAssignment;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createAssignments,
  getAssignmentsByCalendarId,
  completeAssignmentById,
};
