import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../global/styles.css"; // Import the styles

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/auth/login", {  // 🔹 Send request to backend
        email,
        password
      });

      const token = response.data.access_token;
      localStorage.setItem("auth_token", token); // Store token
      onLogin(token); // Redirect to app
      navigate("/"); // Redirect to home page

    } catch (err) {
      console.error("Login error:", err.response ? err.response.data : err.message);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h2>TODO</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <div className="password-container" style={{ display: "flex", alignItems: "center" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="show-password-button"
            style={{ marginLeft: "10px", padding: "8px", backgroundColor: "green", color: "white", paddingLeft: "15px" }} // Add margin-left
          >
            {showPassword ? "Hide" : "Show password"}
          </button>
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>LOGIN</button> {/* Add space between buttons */}
      </form>
      <p>Don't have an account? <a href="/signup">Sign Up</a></p>
    </div>
  );
};

export default Login;
