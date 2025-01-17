import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/Forgot_password';
import { Suspense } from 'react';


function App() { 

  return (
    <div className="giant-construction">
      <Router>
       
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" name="Home" element={<Login />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* Add more routes as needed */}
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
