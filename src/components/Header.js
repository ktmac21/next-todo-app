// Header.jsx
import React from "react";
import Menu from "./Menu";
import "./Header.css";

const Header = () => {
  return (
    <>
      <Menu />
      <div className="header">
        <div className="header-content">
          <h1>ChexMate</h1>
          <p>Manage your tasks effortlessly!</p>
        </div>
      </div>
      </>
  
  );
};

export default Header;
