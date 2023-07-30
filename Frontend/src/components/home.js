import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';

const Home = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const cookie = document.cookie;
        const token = getCookieValue(cookie, 'token');

        const response = await axios.get('http://balaj-loadb-1qm23h3izzst6-958b928f2af44c61.elb.us-east-1.amazonaws.com:8000/current_user', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { username } = response.data;
        setUsername(username);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  function getCookieValue(cookie, name) {
    const match = cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
      return match[2];
    }
    return null;
  }



  return (
    <div className="home-container">
      <h1>Welcome, {username}</h1>
      <p>
      Tirupati Tirumala Lord venkateshwara swamy power, miracles, slokas, strotrams for prayer / meditation. Tirupati lord Balaji / perumal has fulfilled the wishes of many devotees across the world. There is a misconception that only if we offer money and valuables to Govinda Venkateshwara swamy, he fulfills all our wishes, but this is not true. It is the purity of love for the God that automatically helps devotees to be happy and successful in life. Ultimately mental peace and good health is the most desired by all people, more than wealth and worldly pleasures. This purity of soul is what Lord Balaji of Tirumala Tirupati restores in you if prayed with utmost devotion. Devotees all over the world offer money and valuables into the hundi according to their strength and there is no differentiation between less or more offerings to Govinda Venkateshwara God.
      </p>
      <p>
      Venkteshwara swamy has blessed many with unimaginable wonderful gifts in the form of Children to childless people, money in times of need to the needy (opportunities to earn money in the form of jobs or any other hard earning process not to be misunderstood to be easy money provision), curing disease of his devotees by giving them thoughts and strength to choose between healthy foods, good diagnosis centers and good doctors. 
      </p>
      <p>
      The common belief is that the Lord appeared on the Venkatadri hill to save humankind from the ill effects of Kaliyuga. The idol here is worshipped since the beginning of the Kaliyuga. Therefore, people call this place as Kaliyuga Vaikuntam.
      </p>
    </div>
  );
};

export default Home;
