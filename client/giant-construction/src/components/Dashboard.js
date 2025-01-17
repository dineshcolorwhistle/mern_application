import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { Content, Sidebar, Header } from './index'


const Dashboard = () => {
  const [profile, setProfile] = useState('');
 
const navigate = useNavigate();

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5001/dashboard', { withCredentials: true });
      setProfile(response.data);
         
      if(response.data.message !== 'logged'){
        navigate('/');
      }
      
    } catch (error) {     
        
    }
  };

  fetchProfile();
}, [navigate]);



  return (
    <div>      
      {profile && (
        <div>
        <Sidebar />
        <div className="wrapper d-flex flex-column min-vh-100">
        <Header />
          <div className="body flex-grow-1">
          <Content />
          </div>
         
        </div></div>
      ) }
    </div>
  );
}

export default Dashboard;
