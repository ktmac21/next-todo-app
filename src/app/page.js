import React from "react";
import Link from "next/link";
import Image from "next/image";
import './page.css' 

export default function Home() {
    return (
    <div className="landing-page">
    <Image
      src="/ChexMate.png" // The path to your image in the public folder
      alt="checklist image"
      width={800}
      height={800}
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
      width={800}
      height={800}
    />
  </div>
);
};
