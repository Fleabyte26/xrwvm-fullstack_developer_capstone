import React, { useState } from "react";
import "./Register.css";

function Register() {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Registered:", formData);
  };

  return (
    <div className="register_container">

      <h2 className="header">Sign-up</h2>

      <form onSubmit={handleSubmit} className="inputs">

        <div className="input">
          <input
            className="input_field"
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
        </div>

        <div className="input">
          <input
            className="input_field"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </div>

        <div className="input">
          <input
            className="input_field"
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="input">
          <input
            className="input_field"
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="input">
          <input
            className="input_field"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="submit_panel">
          <button type="submit" className="submit">
            Register
          </button>
        </div>

      </form>
    </div>
  );
}

export default Register;
