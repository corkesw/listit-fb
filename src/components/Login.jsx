import React, { useContext, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { UserContext } from "../contexts/UserContext";

const auth = getAuth();

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remail, setREmail] = useState("");
  const [rpassword, setRPassword] = useState("");
  const [loginErr, setLoginErr] = useState(false);
  const [signUpErr, setSignUpErr] = useState(false);
  console.log(remail, rpassword);
  console.log(user);

  const login = (e) => {
    e.preventDefault();
    setLoginErr(false);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const email = userCredential.user.email;
        const uid = userCredential.user.uid;
        setUser({ email, uid });
      })
      .catch(() => setLoginErr(true));
  };

  const register = (e) => {
    e.preventDefault();
    setSignUpErr(false);
    createUserWithEmailAndPassword(auth, remail, rpassword)
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
        <div>
          <h1>Logout</h1>
          <button onClick={logOut}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <form onSubmit={login}>
            <label htmlFor="email">email</label>
            <input
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button>Submit</button>
          </form>
          {loginErr ? <p>something went wrong</p> : <p>All good!</p>}

          <h1>Sign Up</h1>
          <form onSubmit={register}>
            <label htmlFor="remail">email</label>
            <input
              id="remail"
              value={remail}
              onChange={(e) => {
                setREmail(e.target.value);
              }}
            />
            <label htmlFor="rpassword">Password</label>
            <input
              id="rpassword"
              value={rpassword}
              onChange={(e) => {
                setRPassword(e.target.value);
              }}
            />
            <button>Submit</button>
          </form>
          {signUpErr ? <p>something went wrong</p> : <p>All good!</p>}
        </div>
      )}
    </>
  );
};

export default Login;
