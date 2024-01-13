import React from 'react';
import Navbar from './component/Navbar';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './component/Login';
import Home from './pages/Home';
import Favoritepage from './pages/Favourite';
import Trending from './pages/Trending';
import Upcoming from './pages/Upcoming';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favorite" element={<Favoritepage />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/upcoming" element={<Upcoming />} />
      </Routes>
    </Router>
  );
}

export default App
