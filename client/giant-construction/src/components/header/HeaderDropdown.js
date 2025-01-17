import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilLockLocked,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom'


const HeaderDropdown = () => {
  const navigate = useNavigate();
  const { username, email} = useSelector((state) => state.profile);
  

  const[image,setImage] = useState('');
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:5001/logout', {}, { withCredentials: true });
      if(response.data.message === 'logged out'){
      navigate('/');
      }
    } catch (error) {
      
    }
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5001/dashboard', { withCredentials: true });
      } catch (error) {     
          
      }
    };
  
    fetchProfile();
  }, []);

  useEffect(() => {
   
    const fetchProfileImg = async () => {
      try {
        const response = await axios.get('http://localhost:5001/getProfileImage', { withCredentials: true });
        setImage(response.data.image); // This should log the image filename
        
      } catch (error) {
        console.log('Error fetching profile image:', error);
      }
    };
  
    fetchProfileImg();
  }, [image]);
  


  

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={`http://localhost:5001/uploads/${image}`} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end"> 
        <div className='user-profile'>
          <div className='profile-image'>
          <CAvatar src={`http://localhost:5001/uploads/${image}`} size="md" />
          </div>
          <div className='profile-info'>
        <b>{username}</b>  
        <p class="m-0">{email}</p>
        </div>
          </div>      
          <CDropdownDivider />     
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          <Link to="/dashboard/profile">Profile</Link> 
        </CDropdownItem>        
        <CDropdownItem onClick={handleLogout} className='logout-link'>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default HeaderDropdown
