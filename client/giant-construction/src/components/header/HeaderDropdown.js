import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar2 from '../../assets/avatars/2.jpg'
import { Link, useNavigate } from 'react-router-dom'


const HeaderDropdown = () => {
  const navigate = useNavigate();
  const[username,setUsername] = useState('');
  const[email,setEmail] = useState('');
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      if(response.data.message === 'logged out'){
      navigate('/');
      }
    } catch (error) {
      
    }
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/dashboard', { withCredentials: true });
        setUsername(response.data.username)
        setEmail(response.data.email)
      } catch (error) {     
          
      }
    };
  
    fetchProfile();
  }, []);

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar2} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end"> 
        <div className='user-profile'>
          <div className='profile-image'>
          <CAvatar src={avatar2} size="md" />
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
