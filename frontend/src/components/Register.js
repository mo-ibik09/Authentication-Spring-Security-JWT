import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    mail: "",
    password: "",
    role: "USER", // Default role
    confirmed: false,
    age: "", // Age field
    preferences: [], // Preferences list
  });

  const [preference, setPreference] = useState(""); // Temporary state for new preference

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addPreference = () => {
    if (preference.trim()) {
      setFormData({
        ...formData,
        preferences: [...formData.preferences, preference.trim()],
      });
      setPreference("");
    }
  };

  const removePreference = (index) => {
    setFormData({
      ...formData,
      preferences: formData.preferences.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Registering user with data:", formData);

    try {
      const response = await axios.post(
        "http://localhost:8080/register/users", // Update URL if needed
        formData
      );
      console.log("User registered successfully:", response.data);
      alert("User registered successfully!");
    } catch (error) {
      console.error("Error during registration:", error.response?.data || error.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        name="mail"
        value={formData.mail}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
        required
      />
      <div>
        <input
          type="text"
          value={preference}
          onChange={(e) => setPreference(e.target.value)}
          placeholder="Add a preference"
        />
        <button type="button" onClick={addPreference}>
          Add Preference
        </button>
      </div>
      <ul>
        {formData.preferences.map((pref, index) => (
          <li key={index}>
            {pref}{" "}
            <button type="button" onClick={() => removePreference(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
