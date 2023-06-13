import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Bhajanamindralu from '../components/bhajanmindralu';
import Users from '../components/users';
import Reports from '../components/reports';
import Home from '../components/home';
import './landing.css';

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
