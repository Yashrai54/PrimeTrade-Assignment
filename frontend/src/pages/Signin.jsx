import React, { useState, useContext } from "react";
import axios from "axios";
import { ApiContext } from "../../context/ApiContext";
import { useNavigate } from "react-router";

const Signin = () => {
  const { baseUrl } = useContext(ApiContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/auth/login`, formData, {
        withCredentials: true 
      });

      setMessage(res.data.message);
      navigate("/")
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div class="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Sign In</button>
        {message && <p style={{ color: message.includes("success") ? "green" : "red" }}>{message}</p>}
      </form>
    </div>
  );
};

export default Signin;
