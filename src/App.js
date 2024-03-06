import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import './App.css';
import Presiden from './presiden';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/presiden" element={<Presiden />} />
    </Routes>
  </Router>
);

export default App;
