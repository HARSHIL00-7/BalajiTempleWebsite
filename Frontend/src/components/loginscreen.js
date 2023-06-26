import React, { useState, useRef,useEffect } from 'react';
import './loginscreen.css';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import axios from 'axios';


const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isCaptchaSolved = recaptchaRef.current && recaptchaRef.current.getValue() !== '';

    if (username === '') {
      alert('Please enter a username.');
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

    // Input validation
    if (!validateUsername(username)) {
        alert('Please enter a valid username.');
        return;
      }
  
      if (!validatePassword(password)) {
        alert('Please enter a valid password.');
        return;
      }
      const sanitizedUsername = DOMPurify.sanitize(username);
    const sanitizedPassword = DOMPurify.sanitize(password);
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/authenticate', {
        username: sanitizedUsername,
        password: sanitizedPassword,
      },{ withCredentials: true });
    
      if (response.status === 200) {
        setLoggedIn(true);
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('activePage', 'Home');
        navigate('/Landing/Home');
      } else {
        setLoggedIn(false);
        alert('Invalid username or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoggedIn(false);
      if (error.response && error.response.status === 401) {
        alert('Invalid username or password.');
      } else {
        alert('An error occurred while logging in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
    
  };

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9_\s]{3,20}$/; 
    return regex.test(username);
  };

  const validatePassword = (password) => {
    const regex = /^[a-zA-Z0-9!@#$%^&*()-=_+{}[\]:;,?/|~]*$/;

    return regex.test(password);
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
              <ReCAPTCHA sitekey="6LetTlcmAAAAALLWeJMO2vkS11lXJk6hq8OzI8J7" ref={recaptchaRef} />
            </div>
            <div className="remember-me-container">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me!</label>
              <button type="button" onClick={resetCaptcha}>
                Reset reCAPTCHA
              </button>
      
            </div>
           
            
            <div className="buttons-container">
              {loading ? ( 
                <div className="spinner" /> 
              ) : (
                <>
                  <button type="submit">Submit</button>
                  <button type="button">Clear</button>
                </>
              )}
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;




