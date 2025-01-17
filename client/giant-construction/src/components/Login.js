import React, { useState, useEffect, useRef } from 'react';
import Logo from '../assets/gc-logo.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProfileData } from '../slices/profileSlice';

import { gsap } from 'gsap';

const Login = () => {
   const[username,setUsername] = useState('');
   const[password,setPassword] = useState('');
   const[message,setMessage] = useState('');
   const usernameRef = useRef();
   const boxRef = useRef(null);
   const dispatch = useDispatch();

   const navigate = useNavigate();

   useEffect(() => {
    gsap.to(boxRef.current, { y: -190, duration: .5 });
    
    const fetchCookie = async () => {
      try {
        const response = await axios.get('http://localhost:5001/dashboard', { withCredentials: true });
       
        if(response.data.message === 'logged'){
         navigate('/dashboard');
       }
       else{
        navigate('/');
       }
      } catch (error) {
        
      }
    };
  
    fetchCookie();
  }, [navigate]);

const handleChange = (e) => {
const {name, value} = e.target;
if(name === 'username'){
    setUsername(value);
    setMessage(""); 
}
if(name === 'password'){
    setPassword(value);
  
}
}
const handleLogin = async (e) => {
    e.preventDefault();    
    try {
        const response = await axios.post(
            'http://localhost:5001/login',
            { username, password },
            { withCredentials: true }
          );
          if(response.data.message === "valid user"){          
            dispatch(setProfileData({
              username:response.data.userdata.name,
              email:response.data.userdata.email
            }))
            navigate('/dashboard'); 
          }
          else{
                setMessage(response.data.message);             
          }
            
   } 
    catch (error) {
       
    }
  };






    return (
        <section className='admin-registration'>
         <div className='container'>
            <div className='row'>
                <div className='col-md-12 d-flex justify-content-center'>
                    <div ref={boxRef} className='login-section'>
                        <form onSubmit={handleLogin} className='login-form'>
                            <div className='logo-sec'>
                                <img src={Logo} alt="Logo"/>
                            </div>
                                <div className='form-group'>
                                    <input ref={usernameRef} type="text" name="username" value={username} placeholder="Username" className='form-control' onChange={handleChange} />
                                </div>
                                <div className='form-group'>
                                    <input type="password" name="password" value={password} placeholder="Password" className='form-control' onChange={handleChange}/>
                                </div>
                                <Link className="forgot-password" to="/forgot-password">Forgot password?</Link>
                                <span className='error-message'>{message}</span>
                                <button type="submit" className='btn btn-primary'>Login</button>
                        </form>
                   </div>
                </div>            
            </div>
        
         </div>         
        </section>
    )
}

export default Login;