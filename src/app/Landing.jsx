// src/pages/Landing.jsx
import React from 'react';
import Image from 'next/image';
import './Landing.css'; // Import any specific styles for your landing page

const Landing = () => {
  return (
    <div>
      <div className="image-container">
        <Image
          src="/paperclippy.png" // The path to your image in the public folder
          alt="Paperclip"
          width={500} // Specify the desired width
          height={300} // Specify the desired height
          layout="responsive" // Optional: makes the image responsive
          priority // Optional: loads the image with high priority
        />
      </div>
      {/* Additional content for the landing page can go here */}
    </div>
  );
};

export default Landing;
