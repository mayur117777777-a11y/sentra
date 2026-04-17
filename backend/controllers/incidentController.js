const Incident = require("../models/Incident");

// STUDENT: Report incident
exports.reportIncident = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      date,
      location,
      anonymous,
    } = req.body;

    if (!title || !description || !category || !date || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const incident = await Incident.create({
      title,
      description,
      category,
      date,
      location,
      anonymous,
      student: anonymous ? null : req.user.id,
    });

    res.status(201).json({
      message: "Incident reported successfully",
      incident,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// STUDENT: View my incidents
exports.getMyIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({ student: req.user.id });
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN: View all incidents
exports.getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().populate("student", "email role");
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN: Update status & remarks
exports.updateIncidentStatus = async (req, res) => {
  try {
    const { status, adminRemarks, assignedDepartment } = req.body;

    const incident = await Incident.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    incident.status = status || incident.status;
    incident.adminRemarks = adminRemarks || incident.adminRemarks;
    incident.assignedDepartment =
      assignedDepartment || incident.assignedDepartment;

    await incident.save();

    res.json({
      message: "Incident updated successfully",
      incident,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
