import React, { useContext } from "react";
import "../styles/nav.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

const Nav = ({ viewMenu, setViewMenu }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const move = (path) => {
    setViewMenu(false);
    navigate(`${path}`);
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className={`sidenav sidenavopen${viewMenu}`}>
        <span
          className="closebtn"
          onClick={() => {
            setViewMenu(false);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </span>
        <span
          onClick={() => {
            move("/");
          }}
        >
          Home
        </span>
        <span
          onClick={() => {
            move("/lists");
          }}
        >
          Lists
        </span>
        <span
          onClick={() => {
            move("/editor");
          }}
        >
          Editor
        </span>
        {user ? (
          <span
            onClick={() => {
              logOut();
              move("/login");
            }}
          >
            Logout
          </span>
        ) : (
          <span
            onClick={() => {
              move("login");
            }}
          >
            Login
          </span>
        )}
      </div>
    </div>
  );
};

export default Nav;
