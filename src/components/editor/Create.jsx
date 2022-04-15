import React, { useContext } from "react";
import { app, db } from "../../firebase";
import { UserContext } from "../../contexts/UserContext";

const Create = () => {
  const { user, setUser } = useContext(UserContext);
  console.log({user})
  return (
    <div>
      <p>Creator</p>
      {user ? <p>Create List</p>: null}
    </div>
  );
};

export default Create;
