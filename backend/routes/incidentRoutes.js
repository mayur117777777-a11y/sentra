const express = require("express");
const router = express.Router();
const Incident = require("../models/Incident");
const verifyToken = require("../middleware/verifyToken");
const isAdmin = require("../middleware/isAdmin");





router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, category, anonymous } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        message: "Title, description and category are required",
      });
    }

    const incident = new Incident({
      title,
      description,
      category,          // ✅ FIXED
      anonymous: anonymous || false,
      user: req.user.id,
    });

    await incident.save();
    res.status(201).json(incident);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error reporting incident" });
  }
});



// ===============================
// STUDENT → View my incidents
// ===============================
router.get("/my", verifyToken, async (req, res) => {
  try {
    const incidents = await Incident.find({ user: req.user.id });
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ message: "Error fetching incidents" });
  }
});

// ===============================
// ADMIN → View all incidents (WITH PAGINATION + FILTER)
// ===============================
router.get("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const status = req.query.status;

    const query = {};
    if (status) {
      query.status = status;
    }

    const totalIncidents = await Incident.countDocuments(query);

    const incidents = await Incident.find(query)
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      totalIncidents,
      currentPage: page,
      totalPages: Math.ceil(totalIncidents / limit),
      incidents,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch incidents" });
  }
});

// ===============================
// ADMIN → Update incident status
// ===============================
router.put("/:id/status", verifyToken, isAdmin, async (req, res) => {
  try {
    const { status, remarks } = req.body;

    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      { status, remarks },
      { new: true }
    );

    res.json(incident);
  } catch (err) {
    res.status(500).json({ message: "Failed to update incident" });
  }
});

module.exports = router;
