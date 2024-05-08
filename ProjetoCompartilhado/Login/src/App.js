import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import Crud from './page/AppCrud';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Crud" element={<Crud />} />
      </Routes>
    </Router>
  );
}

export default App;