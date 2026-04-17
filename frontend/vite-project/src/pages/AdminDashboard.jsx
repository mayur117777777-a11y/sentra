import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [remarks, setRemarks] = useState({});
  const navigate = useNavigate();

  const fetchIncidents = async () => {
    try {
      const res = await API.get("/incidents", {
        params: statusFilter ? { status: statusFilter } : {},
      });
      setIncidents(res.data.incidents || res.data);
    } catch {
      alert("Failed to load incidents");
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, [statusFilter]);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/incidents/${id}/status`, {
        status,
        remarks: remarks[id] || "",
      });
      fetchIncidents();
    } catch {
      alert("Update failed");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="admin-dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* FILTER */}
      <div className="filter-bar">
        <label>Status Filter</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="In Review">In Review</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* INCIDENTS */}
      <div className="incident-grid">
        {incidents.length === 0 ? (
          <p className="empty">No incidents found.</p>
        ) : (
          incidents.map((incident) => (
            <div key={incident._id} className="incident-card">
              <h4>{incident.title}</h4>
              <p>{incident.description}</p>

              <div className="meta">
                <span className="category">{incident.category}</span>
                <span
                  className={`status ${incident.status.replace(" ", "-")}`}
                >
                  {incident.status}
                </span>
              </div>

              <p className="reported">
                Reported by: {incident.user?.name || "Anonymous"}
              </p>

              <textarea
                placeholder="Admin remarks"
                value={remarks[incident._id] || ""}
                onChange={(e) =>
                  setRemarks({ ...remarks, [incident._id]: e.target.value })
                }
              />

              <div className="action-buttons">
                <button
                  className="review-btn"
                  onClick={() => updateStatus(incident._id, "In Review")}
                >
                  In Review
                </button>
                <button
                  className="resolve-btn"
                  onClick={() => updateStatus(incident._id, "Resolved")}
                >
                  Resolve
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
