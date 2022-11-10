import React, { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import axios from '../../api/axios';
import TextInput from '../../components/TextInput'
import { useAuth } from '../../hooks/useAuth';
import './SignUp.scss';

export default function SignUp() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const {auth} = useAuth();
  const location = useLocation();

  const sendSignupForm = (ev) => {
    ev.preventDefault();

    axios("/api/signup", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username,
        password,
        repeatPassword,
        email
      }
    }).then(jsonData => {
      if(jsonData.statusCode === 201) {
        window.location.replace("/signin");
      }
      alert(jsonData.message)
    })
  };


  return ( !auth 
    ? (
    <div className="content-wrapper">
      <div className="photo-wrapper">
        <div className="photo-collection">
          <img 
            src="https://images.pexels.com/photos/1906879/pexels-photo-1906879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="A woman standing in front of London Eye with her arms raised"
            className="photo-collection__photo"
          />
          <img 
            src="https://images.pexels.com/photos/2272940/pexels-photo-2272940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="A woman taking a picture"
            className="photo-collection__photo"
          />
          <img 
            src="https://images.pexels.com/photos/416024/pexels-photo-416024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="A harbor with boats in it"
            className="photo-collection__photo"
          />
        </div>
      </div>

      <div className="form-container">
        <header>
          <h1 className="logo">Isntagram</h1>
        </header>
        <form method="POST" onSubmit={sendSignupForm}>
          <div className="form-row">
            <TextInput 
              id="login" 
              name="login" 
              label="Login"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
          </div>
          <div className="form-row">
            <TextInput 
              type="password"
              id="password" 
              name="password" 
              label="Password" 
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
          <div className="form-row">
            <TextInput 
              type="password"
              id="repeat-password" 
              name="repeat-password" 
              label="Repeat password" 
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.currentTarget.value)}
            />
          </div>
          <div className="form-row">
            <TextInput 
              type="email"
              id="email" 
              name="email" 
              label="Email" 
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
          <div className="form-row">
            <input type="checkbox" name="tos" id="tos-agreement" required/>
            <label htmlFor="tos-agreement">I accept and agree to the <a href="#">Terms Of Service</a></label>
          </div>
          <p className="neglible">Already have an account? <Link to="/signin">Sign in</Link>.</p>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
    )
    : <Navigate to="/" state={ {from: location} } replace/>
  )
}
