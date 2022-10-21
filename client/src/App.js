import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import React from 'react';
import Home from './views/Home';
import Profile from './views/Profile';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:name" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
