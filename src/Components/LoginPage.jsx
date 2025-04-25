import React, { useState } from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';
import { doSignInWithGoogle, doSignInWithEmailAndPassword } from '../firebase/auth';
import { useAuth } from '../contexts/authContext';
const LoginPage = () => {

const {userLoggedIn} = useAuth();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      await doSignInWithGoogle();
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      setError('Failed to sign in with Google.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await doSignInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Login Error:', error);
      setError('Invalid email or password.');
    }
  };

  return (
    <>
      <div className='login'>
        <form className='login-form' onSubmit={handleSubmit}>
          <h1>Login</h1>
          {error && <p className="error-message">{error}</p>}
          <input className='inputfield' type="text" placeholder='Username' onChange={(e) => setEmail(e.target.value)} required />
          <input className='inputfield' type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
          <div className="checkbox-container">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type='submit'>Login</button>
          <button type='button' className='google-signin' onClick={handleGoogleSignIn}>
            Sign in with Google
          </button>
          <p>Don't have an account? <Link to="/Signup">Register</Link></p>
        </form>
      </div>
    </>
  );
};

export default LoginPage;