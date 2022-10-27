import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import React from 'react';
import Home from './views/Home';
import Profile from './views/Profile';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Navbar from './components/Navbar';
import Explore from './views/Explore';
import PostPreview from './views/PostPreview';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <div className='content'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:name" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/p/:postId" element={<PostPreview />} />
          </Routes>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
