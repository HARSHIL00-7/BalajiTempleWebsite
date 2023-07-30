import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Bhajanamindralu from '../components/bhajanmindralu';
import Users from '../components/users';
import Reports from '../components/reports';
import Home from '../components/home';
import './landing.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const Landing = () => {
  const [activePage, setActivePage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue =
        'Are you sure you want to reload the page? Your unsaved changes may be lost.';
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);

    const storedActivePage = Cookies.get('activePage');
    if (storedActivePage) {
      setActivePage(storedActivePage);

    navigate(`/Landing/${storedActivePage}`);

    }
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
 

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = Cookies.get('token');

        if (!token) {

          navigate('/');
          return;
        }

        const response = await axios.get('http://balaj-loadb-1qm23h3izzst6-958b928f2af44c61.elb.us-east-1.amazonaws.com:8000/check_session', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { message } = response.data;

        if (message === 'Session has expired') {

          navigate('/');
          Cookies.remove('token');
          alert('You have been logged out. Your session has expired.');
        }
      } catch (error) {
        console.error('Failed to check session:', error);
      }
    };

    const intervalId = setInterval(checkSession, 86397 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);


  const handleSetActivePage = (page) => {
    setActivePage(page);
    Cookies.set('activePage', page);
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
<div className='landing'>
  <div>
    <Navbar setActivePage={handleSetActivePage} />
  </div>
  <div className="container">
  <div className='imagecontainer1'></div>
  <div className='imagecontainer1'></div>
    <div className="page-content">{renderPageContent()}</div>
  </div>
</div>

  );
};

export default Landing;
