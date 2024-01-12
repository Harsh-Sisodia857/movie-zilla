import React from 'react';
import Navbar from './component/Navbar';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './component/Login';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App
