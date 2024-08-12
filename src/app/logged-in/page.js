// src/pages/SignedIn.jsx
'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase'; 
import Form from '../Form'; 
import Header from '../Header' 
import Menu from '../Menu';

const SignedIn = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/sign-in'); // Redirect to SignIn page if not authenticated
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
      <Form />
    </div>
  );
};

export default SignedIn;
