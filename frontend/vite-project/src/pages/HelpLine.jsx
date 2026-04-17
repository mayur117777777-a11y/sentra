import { useNavigate } from "react-router-dom";
import "./HelpLine.css";

function HelpLine() {
  const navigate = useNavigate();

  return (
    <div className="helpline-page">
      <div className="helpline-card">
        <h2>🛟 Help & Safety</h2>

        <section>
          <h3>📞 Emergency Numbers (India)</h3>
          <ul>
            <li>Police: <strong>100</strong></li>
            <li>Ambulance: <strong>108</strong></li>
            <li>Fire: <strong>101</strong></li>
            <li>Women Helpline: <strong>181</strong></li>
            <li>Child Helpline: <strong>1098</strong></li>
          </ul>
        </section>

        <section>
          <h3>🛡️ Safety Instructions</h3>
          <ul>
            <li>Do not share your password with anyone.</li>
            <li>Report suspicious activity immediately.</li>
            <li>Stay respectful and follow platform rules.</li>
            <li>Contact authorities in case of emergency.</li>
          </ul>
        </section>

        <p className="note">
          Your safety matters. Help is always available 💙
        </p>

        {/* ✅ BACK BUTTON */}
        <button
          className="back-btn"
          onClick={() => navigate("/student/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default HelpLine;
