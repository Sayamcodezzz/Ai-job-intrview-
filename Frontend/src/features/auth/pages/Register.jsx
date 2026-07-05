import React from 'react'
import "../auth.form.scss"
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

const Register = () => {
const navigate=useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  const {username,email,password}=useAuth();


  return (


    <main>
      <div className='form-container'>
        <h1>Register Form</h1>
        <form onSubmit={handleSubmit}>


          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input 
            onChange={(e)=>{
              username(e.target.value);
            }}
            type="text" id='username' name='username' placeholder='Enter Username' />

          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
            onChange={(e)=>{
              email(e.target.value);
            }}
            type="email" id='email' name='email' placeholder='Enter email address' />

          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
            onChange={(e)=>{
              password(e.target.value)
            }}
            type="password" id='password' name='password' placeholder='Enter password' />

          </div>

          <button className='button primary-button'>Register</button>
        </form>
  
          <p>Already Have an account?<Link to={"/login"}> Login</Link></p>
 
      </div>
    </main>
  )
}

export default Register;
