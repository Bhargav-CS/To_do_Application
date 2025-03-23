import { useState } from "react";
import axios from "axios";
import "../global/styles.css"; // Import the styles

const Signup = ({ onSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/auth/signup", {
        email: email,
        password: password
      });

      if (response.data) {
        onSignup();
      }
    } catch (err) {
      setError("Signup failed");
    }
  };

  return (
    <div className="login-container">
      <h2>TODO</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
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
        <button type="submit" style={{ marginTop: "10px" }}>Sign Up</button> {/* Add space between buttons */}
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default Signup;
