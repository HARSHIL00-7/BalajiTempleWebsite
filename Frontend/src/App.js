import React, { useState } from 'react';
import './App.css';
import { Route, Routes} from 'react-router-dom';
import Login from './components/loginscreen.js';
import Landing from './components/Landing';



const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
   const handleLogin = () => {
    setLoggedIn(true);
  };
  return (
    <div className="App">

    <Routes>
      <Route path="/" element={<Login setLoggedIn={setLoggedIn} handleLogin={handleLogin} />} />
   
      <Route path="/Landing/*" element={<Landing />} />
    </Routes>

    </div>
  );
};

export default App;