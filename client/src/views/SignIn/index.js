import React, { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import TextInput from '../../components/TextInput'
import './SignIn.scss';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

export default function SignIn() {
  
  const {auth, setAuth} = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const sendSignInForm = (ev) => {
    ev.preventDefault();

    axios({
      method: 'post',
      url: '/api/signin',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username,
        password
      }
    }).then(jsonData => {
      setAuth(jsonData.data);
      console.log("Logged in");
      navigate("/");
    })
  };

  return ( !auth
    ? (
    <div className="content-wrapper">
      <div className="form-container">
        <header>
          <h1 className="logo">Isntagram</h1>
        </header>
        <form method="POST" onSubmit={sendSignInForm}>
          <div className="form-row">
            <TextInput 
              id="login" 
              name="login" 
              label="Login" 
              value={username}
              onChange={(ev) => setUsername(ev.currentTarget.value)}
            />
          </div>
          <div className="form-row">
            <TextInput 
              type="password"
              id="password" 
              name="password" 
              label="Password" 
              value={password}
              onChange={(ev) => setPassword(ev.currentTarget.value)}
            />
          </div>
          <p className="neglible">Don't have an account? <Link to="/signup">Sign up now</Link>.</p>
          <button>Sign in</button>
        </form>
      </div>
    </div>
    )
    : <Navigate to="/" state={ {from: location} } replace/>
  )
}
