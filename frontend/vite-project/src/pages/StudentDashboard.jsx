import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch incidents
  const fetchIncidents = async () => {
    try {
      const res = await API.get("/incidents/my");
      setIncidents(res.data);
    } catch {
      console.error("Failed to load incidents");
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  // Create incident
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/incidents", { title, description, category });
      setTitle("");
      setDescription("");
      setCategory("");
      fetchIncidents();
    } catch {
      alert("Failed to create incident");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

        

  return (
    <div className="student-dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <h2>Student Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
            <p
  style={{ color: "#667eea", cursor: "pointer", fontWeight: "600" }}
  onClick={() => navigate("/student/help")}
>
  Need Help?
</p>
      </div>

      {/* REPORT INCIDENT */}
      <div className="card">
        <h3>Report New Incident</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Incident Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Incident Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Theft">Theft</option>
            <option value="Harassment">Harassment</option>
            <option value="Lost Item">Lost Item</option>
            <option value="Other">Other</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Incident"}
          </button>
        </form>
      </div>

      {/* MY INCIDENTS */}
      <div className="card">
        <h3>My Incidents</h3>

        {incidents.length === 0 ? (
          <p className="empty">No incidents reported yet.</p>
        ) : (
          <div className="incident-list">
            {incidents.map((incident) => (
              <div key={incident._id} className="incident-item">
                <h4>{incident.title}</h4>
                <p>{incident.description}</p>

                <div className="incident-meta">
                  <span className="category">{incident.category}</span>
                  <span className={`status ${incident.status.replace(" ", "-")}`}>
                    {incident.status}
                  </span>
                  
                </div>
                
              </div>
                        
            ))}
          </div>
          
        )}
        
      </div>
      

    </div>
  );
};

export default StudentDashboard;
