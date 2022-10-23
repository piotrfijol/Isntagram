import React from 'react'
import { Link } from 'react-router-dom'
import TextInput from '../../components/TextInput'
import './SignIn.scss';

export default function SignIn() {
  return (
    <div className="content-wrapper">
      <div className="form-container">
        <header>
          <h1 className="logo">Isntagram</h1>
        </header>
        <form method="POST">
          <div className="form-row">
            <TextInput 
              id="login" 
              name="login" 
              label="Login" 
            />
          </div>
          <div className="form-row">
            <TextInput 
              type="password"
              id="password" 
              name="password" 
              label="Password" 
            />
          </div>
          <p className="neglible">Don't have an account? <Link to="/signup">Sign up now</Link>.</p>
          <button>Sign in</button>
        </form>
      </div>
    </div>
  )
}
