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
import { Settings } from './components/Settings';
import { EditProfile } from './views/EditProfile';
import TagPosts from './views/TagPosts';
import { ErrorHandler } from './components/ErrorHandler';

function App() {
  useSetup();
  
  return (
    <React.Fragment>
      <ErrorHandler />
        <Navbar />
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/tags/:tag" element={<TagPosts />} />
                <Route path="/profile/:name" element={<Profile />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/p/new" element={<CreatePost />} />
                <Route path="/p/:postId" element={<PostPreview />} />
                <Route path="/logout" element={<SignOut />} />
                <Route element={<Settings />}>
                    <Route path="/settings/edit" element={<EditProfile />}/>
                </Route>
              </Route>
            </Routes>
    </React.Fragment>
  );
}

export default App;
