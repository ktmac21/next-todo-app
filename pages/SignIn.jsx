'use client'
import React, { useState } from 'react';
import './SignIn.css'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase.js';
import { useRouter } from 'next/navigation'
import Header from '../src/app/Header'

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Use the correct hook for signing in
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const router = useRouter()

  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log({ res });
      setEmail('');
      setPassword('');
      router.push('/SignedIn')
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
    <Header/>
    <div className="signin-container">
      <form onSubmit={handleSignIn} className="signin-form">
        <h2>Sign In</h2>
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
        <button type="submit">Sign In</button>
        {error && <p className="error">{error.message}</p>}
      </form>
    </div>
    </div>
  );
};

export default SignIn;