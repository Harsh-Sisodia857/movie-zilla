import React from 'react';
import Navbar from './component/Navbar';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './component/Login';
import Home from './pages/Home';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App
