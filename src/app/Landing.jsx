// src/pages/Landing.jsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./Landing.css"; // Import any specific styles for your landing page

const Landing = () => {
  return (
    <div className="landing-page">
      <Image
        src="/ChexMate.png" // The path to your image in the public folder
        alt="checklist image"
        width={500}
        height={500}
        layout="responsive"
        priority
      />

      <div>
        <h1>Welcome to ChexMate</h1>
        <p>Organize your tasks efficiently with style.</p>

        <p>
          Do not have an account?{" "}
          <Link className="signup-link" href="/SignUp">
            Sign up
          </Link>{" "}
          to start managing your tasks!
        </p>

        <p>
          Welcome to ChexMate, where managing your daily tasks becomes
          effortless. Our intuitive design helps you organize your day with
          efficiency and ease, making sure you never miss a beat. Get ready to
          enhance your productivity and simplify your life with just a few
          clicks!
        </p>
      </div>

      <Image
        src="/checkz.png"
        alt="Check Marks"
        width={400}
        height={400}
        layout="responsive"
      />
    </div>
  );
};

export default Landing;
