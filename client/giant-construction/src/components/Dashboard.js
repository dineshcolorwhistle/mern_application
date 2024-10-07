import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { Content, Sidebar, Header } from './index'


const Dashboard = () => {
  const [profile, setProfile] = useState('');
  const [message, setMessage] = useState('');

const navigate = useNavigate();

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/dashboard', { withCredentials: true });
      setProfile(response.data);
     
      if(response.data.message !== 'logged'){
        navigate('/');
      }
      
    } catch (error) {     
        
    }
  };

  fetchProfile();
}, [navigate]);

const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      if(response.data.message === 'logged out'){
      navigate('/');
      }
    } catch (error) {
      setMessage('Error logging out');
    }
  };

  return (
    <div>      
      {profile ? (
        <div>
        <Sidebar />
        <div className="wrapper d-flex flex-column min-vh-100">
        <Header />
          <div className="body flex-grow-1">
          <Content />
          </div>
         
        </div></div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
}

export default Dashboard;
