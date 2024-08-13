'use client'
import React, { useState } from 'react';
import './SignUp.css'
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth';
import {auth} from '../../../firebase.js'
import { useRouter } from 'next/navigation'

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter()

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  
  const isValidPassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*]/;
    return (
      password.length >= minLength &&
      hasNumber.test(password) &&
      hasSpecialChar.test(password)
    );
  }; 
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!isValidPassword(password)) {
      setError('Password must be at least 8 characters long and include a number and a special character.');
      return;
    }
    try {
      const res = await createUserWithEmailAndPassword(email, password)
      console.log({res})
      setEmail('');
      setPassword('')
      router.push('/SignIn')
    } catch(error) {
      const errorCode = error.code;
      const errorMessage = error.message
      console.log("error message:", errorMessage)
      handleAuthError(e)
    }

    
  
    const handleAuthError = (error) => {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('This email is already in use.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address.');
          break;
        case 'auth/weak-password':
          setError('Password is too weak.');
          break;
        default:
          setError('An error occurred during registration. Please try again.');
      }
    };
  
  
  };

  return (
    <div>
    <div className="signup-container">
      <form onSubmit={handleSignUp} className="signup-form">
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
         
        <button type="submit">Sign Up</button>
      </form>
    </div>
    </div>
  );
};

export default SignUp;
