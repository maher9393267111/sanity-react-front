import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './container/Home';
import Login from './components/Login';
function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>


    </div>
  );
}

export default App;
