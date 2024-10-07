import React, { useState } from "react";
import Logo from '../assets/gc-logo.png';
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
    const[email, setEmail] = useState('');
   
    const handleChange = (e) => {
        const {value, name} = e.target;
        if(name === 'email'){
            setEmail(value);
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
         const response = await axios.post('http://localhost:5000/forgot-password',{email});
         if(response.data.Message === "valid email"){
            console.log('Email function');
         }
         else{
            console.log('');
         }
        }
        catch (error){

        }
    }
    return(
        <>
        <section className='admin-forgotpassword'>
         <div className='container'>
            <div className='row'>
                <div className='col-md-12 d-flex justify-content-center'>
                    <div className='forgot-password-section'>
                        <form onSubmit={handleSubmit} className='forgot-password'>
                            <div className='logo-sec'>
                                <img src={Logo} alt="Logo"/>
                            </div>
                                <div className='form-group'>
                                    <input type="email" name="email" value={email} placeholder="Email" className='form-control' onChange={handleChange} />
                                </div> 
                                
                                <button type="submit" className='btn btn-primary'>Submit</button>
                                <Link className="signin-link" to="/">Signin</Link>
                        </form>
                   </div>
                </div>            
            </div>
        
         </div>         
        </section>
        </>
    )
}
export default ForgotPassword;