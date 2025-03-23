import { useState } from "react";
import axios from "axios";
import "../global/styles.css"; // Import the styles

const Signup = ({ onSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("https://dev-jl2vab7n0f15zplh.us.auth0.com/dbconnections/signup", {
        client_id: "toIjnYmWJrFzqXyBeivfwCoas53GztVm",
        email: email,
        password: password,
        connection: "Username-Password-Authentication"
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
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default Signup;
