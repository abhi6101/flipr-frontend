import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ProjectDetails from './pages/ProjectDetails'; // Import the new page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        {/* Dynamic Route for Project Details */}
        <Route path="/offerings/:id" element={<ProjectDetails />} /> 
      </Routes>
    </Router>
  );
}

export default App;