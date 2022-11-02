import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TextInput from '../../components/TextInput'
import './SignIn.scss';

export default function SignIn() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const sendSignInForm = (ev) => {
    ev.preventDefault();

    fetch("/api/signin", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    }).then(data => data.json()).then(jsonData => {
      localStorage.setItem("_jwt", jsonData.token);
      alert("Logged in");
      window.location.replace("/");
    })
  };

  return (
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
}
