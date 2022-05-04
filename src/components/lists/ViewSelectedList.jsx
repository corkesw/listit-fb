import React, { useContext, useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { UserContext } from "../../contexts/UserContext";
import app from "../../firebase";
import { useParams } from "react-router-dom";

const database = getDatabase(app);

const ViewSelectedList = () => {
  const { user } = useContext(UserContext);
  const { listId } = useParams();
  const [listName, setListName] = useState("");
  

  useEffect(() => {
    onValue(ref(database, `lists/${listId}`), (snapshot) => {
      const { meta, items } = snapshot.val();
      setListName(meta.name);
      
    });
  }, [listId]);
  return (
    <div>
      <h1>{listName}</h1>
    </div>
  );
};

export default ViewSelectedList;
