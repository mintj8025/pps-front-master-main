import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter ,Routes , Route } from "react-router-dom";
import Login from './Login.js'
import Home from './Home.js'
import Register from './Register.js'
import AssPatientFound from './AssPatientFound.js'
import AssNRS from './AssNRS.js'
import AssBPI from './AssBPI.js'
import SideEffect from './SideEffect.js'
import AssPPS from './AssPPS.js'
import PpsResult from './PpsResult'
import History from './History.js'
import Profile from './Profile.js'
import Patient_info from './Patient_info.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login />} /> 
    <Route path="/login" element={<Login />} /> 
    <Route path="/register" element={<Register />} /> 
    <Route path="/home" element={<Home />} /> 
    <Route path="/asspatientfound" element={<AssPatientFound />} /> 
    <Route path="/assnrs" element={<AssNRS />} /> 
    <Route path="/assbpi" element={<AssBPI />} /> 
    <Route path="/sideeffect" element={<SideEffect />} /> 
    <Route path="/asspps" element={<AssPPS />} /> 
    <Route path="/ppsresult" element={<PpsResult />} /> 
    <Route path="/history" element={<History />} /> 
    <Route path="/profile" element={<Profile />} /> 
    <Route path="/patient_info" element={<Patient_info />} /> 

    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
