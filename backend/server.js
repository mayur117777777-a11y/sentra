const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const adminIncidentRoutes = require("./routes/adminIncidentRoutes");


// ROUTES
const incidentRoutes = require("./routes/incidentRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express(); // ✅ app MUST be before app.use

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/admin/incidents", adminIncidentRoutes);

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/incidents", incidentRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Sentra Backend Running");
});

// DATABASE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err));

// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
