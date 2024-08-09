// src/components/Menu.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import "./Menu.css"
import logo from "/public/logo.png"
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase.js'
import { useRouter } from 'next/navigation'

const Menu = () => {
  const router = useRouter(); // Initialize the useRouter hook

  const handleSignOut = async () => {
    try {
      const res = await signOut(auth); // Sign out the user
      console.log({ res });
      router.push('/SignIn'); // Redirect to the SignIn page
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <header className="header">
      <div className="logo">
        <Image 
        priority
        src={logo} 
        alt="Logo"
        height="60"
        width="60" />
      </div>
      <nav className="nav">
        <Link href="/SignUp" className="link">Sign Up</Link>
        <Link href="/SignIn" className="link">Login</Link>
        <button onClick={handleSignOut}>Sign Out</button>
        
      </nav>
    </header>
  );
};

export default Menu;
