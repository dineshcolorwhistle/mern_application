import React, { useState } from 'react';
import Logo from '../assets/gc-logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
   const[username,setUsername] = useState('');
   const[password,setPassword] = useState('');
   const[message,setMessage] = useState('');

   const navigate = useNavigate();
    
const handleChange = (e) => {
const {name, value} = e.target;
if(name === 'username'){
    setUsername(value)
}
if(name === 'password'){
    setPassword(value)
}
}
const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
     if(response.data == 'valid user'){
        navigate('/dashboard');
        setMessage('');
    }
   }
    catch (error) {
        setMessage('Invalid credentials')
    }
  };
    return (
        <section className='admin-registration'>
         <div className='container'>
            <div className='row'>
                <div className='col-md-12 d-flex justify-content-center'>
                    <div className='login-section'>
                        <form onSubmit={handleLogin} className='login-form'>
                            <div className='logo-sec'>
                                <img src={Logo} alt="Logo"/>
                            </div>
                                <div className='form-group'>
                                    <input type="text" name="username" value={username} placeholder="Username" className='form-control' onChange={handleChange} />
                                </div>
                                <div className='form-group'>
                                    <input type="password" name="password" value={password} placeholder="Password" className='form-control' onChange={handleChange}/>
                                </div>
                                <a className="forgot-password" href="#">Forgot password?</a>
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