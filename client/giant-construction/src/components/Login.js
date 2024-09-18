import React from 'react';
import Logo from '../assets/gc-logo.png';

const Login = () => {
    return (
        <section className='admin-registration'>
         <div className='container'>
            <div className='row'>
                <div className='col-md-12 d-flex justify-content-center'>
                    <div className='login-section'>
                        <form className='login-form'>
                            <div className='logo-sec'>
                                <img src={Logo} alt="Logo"/>
                            </div>
                                <div className='form-group'>
                                    <input type="text" name="username" placeholder="Username" className='form-control' />
                                </div>
                                <div className='form-group'>
                                    <input type="password" name="password" placeholder="Password" className='form-control' />
                                </div>
                                <a className="forgot-password" href="#">Forgot password?</a>
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