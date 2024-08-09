// src/components/Menu.js
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "./Menu.css";
import logo from "/public/logo.png";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.js";
import { useRouter } from "next/navigation";

const Menu = () => {
  const [user, setUser] = useState(null); // State to store the user
  const router = useRouter(); // Initialize the useRouter hook

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  const handleSignOut = async () => {
    try {
      const res = await signOut(auth); // Sign out the user
      console.log({ res });
      router.push("/"); // Redirect to the SignIn page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <header className="menu-header">
      <div className="logo">
        <Link href="/" passHref>
          <Image className="logo-image"
            priority
            src={logo}
            alt="Logo"
            height={100}
            width={100}
          />
        </Link>
      </div>
      <nav className="nav">
        {!user ? (
          <>
            <Link href="/SignUp" className="link">
              Sign Up
            </Link>
            <Link href="/SignIn" className="link">
              Login
            </Link>
          </>
        ) : (
          <button className="logout-button" onClick={handleSignOut}>
            Sign Out
          </button>
        )}
      </nav>
    </header>
  );
};

export default Menu;
