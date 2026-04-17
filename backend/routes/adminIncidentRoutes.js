const express = require("express");
const router = express.Router();
const Incident = require("../models/Incident");
const verifyToken = require("../middleware/verifyToken");
const isAdmin = require("../middleware/isAdmin");

// ADMIN → Get all incidents
router.get("/", verifyToken, isAdmin, async (req, res) => {
  const incidents = await Incident.find().populate("user", "name email");
  res.json(incidents);
});

// ADMIN → Update incident status
router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  const { status, adminRemark } = req.body;

  const incident = await Incident.findByIdAndUpdate(
    req.params.id,
    { status, adminRemark },
    { new: true }
  );

  res.json(incident);
});

module.exports = router;
