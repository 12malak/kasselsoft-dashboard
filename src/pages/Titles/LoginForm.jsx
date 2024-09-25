import React, { useState } from "react";
import "../../Css/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFlag, setEmailFlag] = useState(true);
  const [passwordFlag, setPasswordFlag] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;
  const [correctPassword, setCorrectPassword] = useState(true);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validatePassword = (password) => {
    return password.trim() !== '';
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    validateUser();
  };

  const validateUser = async () => {
    const passwordIsValid = validatePassword(password);
    setCorrectPassword(true); // Reset the password validation flag

    if (passwordIsValid) {
      setEmailFlag(true);
      setPasswordFlag(true);
      await submitUser();
    } else {
      setEmailFlag(true);
      setPasswordFlag(false);
    }
  };

  const submitUser = async () => {
    try {
      const response = await axios.post(`${API_URL}/auth/login/post`, { email, password },      { withCredentials: true } // This is important for cookies
      );
      if (response.data.Status === "Login Succses") {
        navigate('/en'); // Redirect to home or desired route
      } else {
        if (response.data.Error === "Incorect Password") {
          setCorrectPassword(false);
        } else if (response.data.Error === "No email exists") {
          setEmailFlag(false);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container">
      <div id="login-form">
        <h1>Login</h1>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="username">Email:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={email}
            onChange={handleEmailChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
         
          {!correctPassword && (
            <p style={{ color: 'red' }}>Incorrect Password</p>
          )}
          {!emailFlag && (
            <p style={{ color: 'red' }}>Email not found.</p>
          )}
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
