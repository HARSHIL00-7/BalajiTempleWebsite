import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Bhajanamindralu from '../components/bhajanmindralu';
import Users from '../components/users';
import Reports from '../components/reports';
import Home from '../components/home';
import './landing.css';
import axios from 'axios';

const Landing = () => {
  const [activePage, setActivePage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedPage = localStorage.getItem('activePage');
    if (storedPage) {
      setActivePage(storedPage);
      if (
        storedPage === 'bhajanamindralu' ||
        storedPage === 'users' ||
        storedPage === 'reports'
      ) {
        window.addEventListener('beforeunload', handleBeforeUnload);
      }
    }
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = localStorage.getItem('access_token');
    
        const response = await axios.get('http://0.0.0.0:8000/check_session', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
    
        if (response.data.message === 'Session has expired') {
          localStorage.removeItem('access_token');
          navigate('/');
          alert('You have been logged out, your session has expired.');
        }
        if (response.data.message === 'Session is valid') {
          console.log('active session');
        }
      } catch (error) {
        console.log('Error checking session:', error);
      }
    };

    // Call checkSession every 20 seconds
    const intervalId = setInterval(checkSession, 20000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [navigate]);

  useEffect(() => {
    if (!location.state?.fromReload) {
      localStorage.setItem('activePage', activePage);
    }
  }, [activePage, location]);

  const handleSetActivePage = (page) => {
    setActivePage(page);
    navigate(`/Landing/${page}`);
  };

  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = '';
  };
  const renderPageContent = () => {
  
    switch (activePage) {
      case 'Home':
        return <Home />;
      case 'bhajanamindralu':
        return <Bhajanamindralu />;
      case 'users':
        return <Users />;
      case 'reports':
        return <Reports />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <Navbar setActivePage={handleSetActivePage} />
      <div className="container">
        <div className="imagecontainer1"></div>
        <div className="imagecontainer1"></div>
        <div className="page-content">{renderPageContent()}</div>
      </div>
    </div>
  );
};

export default Landing;
