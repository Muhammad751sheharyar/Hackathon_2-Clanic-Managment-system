import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

const navStyle = {
  display: 'flex',
  gap: '20px',
  padding: '20px',
  background: '#f4f4f4',
  marginBottom: '30px'
};

function App() {
  return (
        <Signup/>
        

  );
}

export default App;