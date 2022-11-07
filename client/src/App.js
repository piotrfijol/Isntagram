import './App.scss';
import { Routes, Route } from 'react-router-dom'; 
import React, { useEffect } from 'react';
import Home from './views/Home';
import Profile from './views/Profile';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Navbar from './components/Navbar';
import Explore from './views/Explore';
import PostPreview from './views/PostPreview';
import ProtectedRoute from './components/ProtectedRoute';
import { useSetup } from './hooks/useSetup';
import { SignOut } from './views/SignOut';
import { CreatePost } from './views/CreatePost';

function App() {
  useSetup();
  
  return (
    <React.Fragment>
        <Navbar />
        <div className='content'>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile/:name" element={<Profile />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/p/new" element={<CreatePost />} />
              <Route path="/p/:postId" element={<PostPreview />} />
              <Route path="/logout" element={<SignOut />} />
            </Route>
          </Routes>
        </div>
    </React.Fragment>
  );
}

export default App;
