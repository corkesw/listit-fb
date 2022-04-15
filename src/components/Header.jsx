import React from "react";
import "../styles/header.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ viewMenu, setViewMenu }) => {
  const handleToggle = () => {
    setViewMenu((prev) => !prev);
  };
  return (
    <div className="banner">
      <nav className="navBar">
        <span className="burger" onClick={handleToggle}>
          <FontAwesomeIcon icon={faBars} />
        </span>
        <p className="heading">ListIt App</p>
      </nav>
    </div>
  );
};

export default Header;
