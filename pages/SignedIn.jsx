// src/pages/SignedIn.jsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Ensure this path is correct
import Form from '../src/app//Form'; // Ensure this path is correct
import Header from '../src/app/Header' // Optionally include the header
import Menu from '../src/app/Menu';

const SignedIn = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/SignIn'); // Redirect to SignIn page if not authenticated
      } else {
        setLoading(false); // Set loading to false if user is authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking auth state
  }

  return (
    <div>
      <Menu />  
      <Header />
      <h1>Welcome to Your Task Manager</h1>
      <Form />
    </div>
  );
};

export default SignedIn;
