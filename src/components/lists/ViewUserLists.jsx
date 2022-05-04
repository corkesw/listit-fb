import React, { useContext, useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { UserContext } from "../../contexts/UserContext";
import app from "../../firebase";
import toPairs from "lodash/fp/toPairs";
import { useNavigate } from "react-router-dom";



const database = getDatabase(app);

const ViewUserLists = ({ setSelectedList }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate()
  const [lists, setLists] = useState([]);

  useEffect(() => {
    onValue(ref(database, `users/${user.uid}`), (snapshot) => {
      const { lists } = snapshot.val();
      setLists(toPairs(lists));
    });

  }, []);
  return (
    <div>
      <h1>User List</h1>

      {lists.map((item) => {
        return (
          <p
            className="clickable__list__item"
            onClick={() => {
              navigate(`/lists/${item[0]}`);
            }}
          >
            {item[1]}
          </p>
        );
      })}
    </div>
  );
};

export default ViewUserLists;
