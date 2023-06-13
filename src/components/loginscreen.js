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
      navigate('/'); 
    };

    window.addEventListener('popstate', handleWindowBack);

    return () => {
      window.removeEventListener('popstate', handleWindowBack);
    };
  }, []);

  const handleSubmit = (e) => {

    e.preventDefault();
   
    const isValid = validateCredentials(username, password);
    const isCaptchaSolved = recaptchaRef.current && recaptchaRef.current.getValue() !== ''; 

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
      localStorage.setItem('activePage', 'Home');
      navigate('/Landing/Home');
    } else {
      setLoggedIn(false);
    }
  };

  const validateCredentials = (username, password) => {

    return username === 'admin' && password === 'password';
  };

  const onChange = (value) => {
 
  };

  const resetCaptcha = () => {
    recaptchaRef.current.reset();
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
      <div>xs</div>
    </div>
  );
};

export default Login;
