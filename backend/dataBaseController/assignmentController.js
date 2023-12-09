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

// Create a new assignment and associate it with a calendar
const createAssignment = async (req, res) => {
  try {
    const { calendarId } = req.body;

    const newAssignment = await Assignment.create(req.body);

    if (calendarId) {
      const calendar = await Calendar.findById(calendarId);
      if (!calendar) {
        return res.status(404).json({ message: "Calendar not found" });
      }

      calendar.assignments.push(newAssignment._id);
      await calendar.save();
    }

    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all assignments
const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
const updateAssignmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedAssignment = await Assignment.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedAssignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.status(200).json(updatedAssignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an assignment by ID and remove it from associated calendars
const deleteAssignmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAssignment = await Assignment.findByIdAndDelete(id);
    if (!deletedAssignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Remove assignment from associated calendars
    const calendars = await Calendar.find({ assignments: id });
    for (const calendar of calendars) {
      calendar.assignments.pull(id);
      await calendar.save();
    }

    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAssignments,
  createAssignment,
  getAllAssignments,
  getAssignmentsByCalendarId,
  updateAssignmentById,
  deleteAssignmentById,
};
