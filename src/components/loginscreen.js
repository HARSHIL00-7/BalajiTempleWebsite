import React, { useState, useRef, useEffect } from 'react';
import './loginscreen.css';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const recaptchaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleWindowBack = () => {
      navigate('/'); // Redirect to the login screen
    };

    window.addEventListener('popstate', handleWindowBack);

    return () => {
      window.removeEventListener('popstate', handleWindowBack);
    };
  }, []);

  const handleSubmit = (e) => {

    e.preventDefault();
    // Perform username and password validation
    const isValid = validateCredentials(username, password); // Replace with your validation logic
    const isCaptchaSolved = recaptchaRef.current && recaptchaRef.current.getValue() !== ''; // Check if the captcha is solved

    if (username === '') {
      alert('Please enter a username.');
      return;
    }

    if (username !== 'admin') {
      alert('Please enter a valid username.');
      return;
    }

    if (password !== 'password') {
      alert("Password and username don't match.");
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
    
    if (isValid && isCaptchaSolved) {
      setLoggedIn(true);
      navigate('/Landing/Home');
    } else {
      setLoggedIn(false);
    }
  };

  const validateCredentials = (username, password) => {
    // Replace with your own validation logic
    // For demonstration purposes, username is 'admin' and password is 'password'
    return username === 'admin' && password === 'password';
  };

  const onChange = (value) => {
    // Handle reCAPTCHA change event
  };

  const resetCaptcha = () => {
    recaptchaRef.current.reset(); // Reset the reCAPTCHA
  };

  return (
    <div className="container1">
      <div className="login-box">
        <div className="image-container">
        <img src={process.env.PUBLIC_URL + '/assets/LoginTemple.jpg'} alt="Login" />
        </div>
        <div className="details-container">
          <h2 className="login-heading">Log In</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input className='i1'
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
              className='i1'
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
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me!</label>
              <button type="button" onClick={resetCaptcha}>
                Reset reCAPTCHA
              </button>
            </div>
            <div className="buttons-container">
              <button type="submit">Submit</button>
              <button type="button">Clear</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
