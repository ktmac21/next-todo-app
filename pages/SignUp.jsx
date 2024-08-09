'use client'
import React, { useState } from 'react';
import './SignUp.css'
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth';
import {auth} from '../firebase.js'
import { useRouter } from 'next/navigation'
import Header from '../src/app/Header'
import Menu from '../src/app/Menu'

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(email, password)
      console.log({res})
      setEmail('');
      setPassword('')
      router.push('/SignIn')
    } catch(e) {
      console.error(e)
    }
  
  };

  return (
    <div>
    <Menu />
    <Header />
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
    </div>
  );
};

export default SignUp;
