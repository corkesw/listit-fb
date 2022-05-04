import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import ViewUserLists from "./ViewUserLists";

const Lists = () => {
  const { user } = useContext(UserContext);
  const [selectedList, setSelectedList] = useState(null)

  return <div className="content__wrapper">This is the lists
  {user ? <ViewUserLists />: <p>Log in!!!</p>}
  </div>;
};

export default Lists;
