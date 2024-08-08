// src/components/Menu.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import "./Menu.css"
import logo from "/public/logo.png"

const Menu = () => {
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
        <Link href="/" className="link">Home</Link>
        <Link href="/about" className="link">About</Link>
      </nav>
    </header>
  );
};

export default Menu;
