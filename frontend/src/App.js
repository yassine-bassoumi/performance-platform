import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <nav className="mb-3">
          <Link to="/" className="btn btn-primary me-2">Sign Up</Link>
          <Link to="/login" className="btn btn-success">Sign In</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
