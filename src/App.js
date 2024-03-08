import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import './App.css';
import Presiden from './presiden';
import NavigationBar from './Components/Navbar';
import Verify from './verify';

const App = () => (
  <Router>
    <NavigationBar />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/presiden" element={<Presiden />} />
    </Routes>
  </Router>
);

export default App;
