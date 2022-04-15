import React, { useContext, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const auth = getAuth();

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setsignUpPassword] = useState("");
  const [loginErr, setLoginErr] = useState(false);
  const [signUpErr, setSignUpErr] = useState(false);
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    setLoginErr(false);
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        const email = userCredential.user.email;
        const uid = userCredential.user.uid;
        setUser({ email, uid });
        setLoginEmail("");
        setLoginPassword("");
        navigate("/");
      })
      .catch(() => setLoginErr(true));
  };

  const register = (e) => {
    e.preventDefault();
    setSignUpErr(false);
    createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
      .then((userCredential) => {
        const email = userCredential.user.email;
        const uid = userCredential.user.uid;
        setUser({ email, uid });
      })
      .catch(() => setSignUpErr(true));
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {user ? (
        <div className="login">
          <p className="loghead" onClick={logOut}>
            Logout
          </p>
        </div>
      ) : (
        <div className="div wrapper">
          <h1 className="header">Login</h1>
          <form className="form-login" onSubmit={login}>
            <label className="form-item" htmlFor="email">
              Email
            </label>
            <input
              className="form-item"
              id="email"
              value={loginEmail}
              onChange={(e) => {
                setLoginEmail(e.target.value);
              }}
            />
            <label className="form-item" htmlFor="password">
              Password
            </label>
            <input
              className="form-item"
              id="password"
              value={loginPassword}
              onChange={(e) => {
                setLoginPassword(e.target.value);
              }}
            />
            <span></span>
            <button className="form-item">Submit</button>
          </form>
          {loginErr ? <p>something went wrong</p> : <p>All good!</p>}

          <h1 className="header">Sign Up</h1>
          <form className="form-login" onSubmit={register}>
            <label className="form-item" htmlFor="signUpEmail">Email</label>
            <input className="form-item"
              id="signUpEmail"
              value={signUpEmail}
              onChange={(e) => {
                setSignUpEmail(e.target.value);
              }}
            />
            <label className="form-item" htmlFor="signUpPassword">Password</label>
            <input
            className="form-item"
              id="signUpPassword"
              value={signUpPassword}
              onChange={(e) => {
                setSignUpPassword(e.target.value);
              }}
            />
            <span></span>
            <button className="form-item">Submit</button>
          </form>
          {signUpErr ? <p>something went wrong</p> : <p>All good!</p>}
        </div>
      )}
    </>
  );
};

export default Login;
