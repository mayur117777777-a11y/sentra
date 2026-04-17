import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"


function Login({ switchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    console.log(res.data); // 👈 ADD THIS (debug)

    const { token, user } = res.data;
    localStorage.setItem("token", token);

    if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/student/dashboard");
    }
  } catch (err) {
    alert("Invalid email or password");
  }
};



  return (
  <div className="login-page">
    <div className="login-card">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} className="login-btn">
        Login
      </button>

      <p style={{ textAlign: "center" }}>
        Don’t have an account?
        <button onClick={() => navigate("/register")} className="register-link">
          Register
        </button>
      </p>
    </div>
  </div>
);


}

export default Login;
