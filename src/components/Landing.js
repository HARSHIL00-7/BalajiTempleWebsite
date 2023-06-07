import React, { useState } from 'react';
import Navbar from './navbar';
import Bhajanamindralu from '../components/bhajanmindralu';
import Users from '../components/users';
import Reports from '../components/reports';
import './landing.css';

const Landing = () => {
  const [activePage, setActivePage] = useState('');

  const renderPageContent = () => {
    if (activePage === '') {
      return <DefaultContent />;
    }
    switch (activePage) {
      case 'bhajanamindralu':
        return <Bhajanamindralu />;
      case 'users':
        return <Users />;
      case 'reports':
        return <Reports />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar setActivePage={setActivePage} />
      <div className="container">
        <div className="imagecontainer1"></div>
        <div className="imagecontainer2"></div>
        <div className="page-content">
          {renderPageContent()}
        </div>
      </div>
    </div>
  );
};

const DefaultContent = () => {
  return (
    <div>
      <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h1>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
    </div>
  );
};

export default Landing;
