import React, { useState } from 'react';
import './Signup.css';
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleGoogleSignUp = async () => {
    try {
      await doSignInWithGoogle();
      setSuccess('Google Sign-Up Successful!');
      console.log('Google Sign-Up Successful');
    } catch (error) {
      console.error('Google Sign-Up Error:', error);
      setError('Failed to sign up with Google.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      setSuccess('Sign-Up Successful!');
      console.log('Sign-Up Successful');
    } catch (error) {
      console.error('Sign-Up Error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('Email is already in use.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <>
      <div className='signup'>
        <form className='signup-form' onSubmit={handleSubmit}>
          <h1>Signup</h1>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <input
            className='inputfield'
            type="text"
            placeholder='Username'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className='inputfield'
            type="email"
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className='inputfield'
            type="password"
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="checkbox-container">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">I agree to the terms and conditions</label>
          </div>
          <button type='submit'>Signup</button>
          <button type='button' className='google-signup' onClick={handleGoogleSignUp}>
            Sign up with Google
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;