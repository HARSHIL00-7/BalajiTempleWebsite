import React, { useState, useRef } from 'react';
import './signupscreen.css';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const recaptchaRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isCaptchaSolved = recaptchaRef.current && recaptchaRef.current.getValue() !== '';

    if (username === '') {
      alert('Please enter a username.');
      return;
    }

    if (email === '') {
      alert('Please enter an email address.');
      return;
    }

    if (password === '') {
      alert('Please enter a password.');
      return;
    }

    if (!isCaptchaSolved) {
      alert('Please solve the reCAPTCHA.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/signup', {
        username,
        email,
        password,
      });

      if (response.status === 200 && response.data.message === 'Signup successful') {
        alert('Signup successful. Please log in.');
        navigate('/login');
      } else {
        alert('An error occurred while signing up. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred while signing up. Please try again.');
    }
  };

  const onChange = (value) => {};

  const resetCaptcha = () => {
    recaptchaRef.current.reset();
  };

  return (
    <div className="container3">
      <div className="signup-box">
        <div className="image-container2">
          <img src={process.env.PUBLIC_URL + '/assets/SignupTemple.jpg'} alt="Signup" />
        </div>
        <div className="details-container2">
          <h2 className="signup-heading">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-container2">
              <input
                className="i1"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                className="i1"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                className="i1"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <ReCAPTCHA sitekey="6LetTlcmAAAAALLWeJMO2vkS11lXJk6hq8OzI8J7" onChange={onChange} ref={recaptchaRef} />
            </div>
            <div className="remember-me-container">
              <input type="checkbox" id="agree-terms" />
              <label htmlFor="agree-terms">I agree to the terms and conditions.</label>
              <button type="button" onClick={resetCaptcha}>
                Reset reCAPTCHA
              </button>
            </div>
            <div className="buttons-container">
              <button type="submit">Submit</button>
              <button type="button">Clear</button>
            </div>
          </form>
          <span className="login-link">
            Already have an account? <a href="/login">Log In</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
