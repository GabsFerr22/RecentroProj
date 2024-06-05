import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import Crud from './page/AppCrud';
import MyMap from "./page/Mapa"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyMap />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Crud" element={<Crud />} />
      </Routes>
    </Router>
  );
}

export default App;