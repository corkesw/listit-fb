import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./components/editor/Create";
import Editor from "./components/editor/Editor";
import Header from "./components/Header";
import Home from "./components/Home";
import Lists from "./components/lists/Lists";
import ViewSelectedList from "./components/lists/ViewSelectedList";
import Login from "./components/Login";
import Nav from "./components/Nav";
import { UserContext } from "./contexts/UserContext";
const auth = getAuth();

const App = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [viewMenu, setViewMenu] = useState(false);
  if (user) console.log(user.email)
  else console.log('no user')

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email;
        const uid = user.uid;
        setUser({ email, uid });
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Nav viewMenu={viewMenu} setViewMenu={setViewMenu} />
        <Header viewMenu={viewMenu} setViewMenu={setViewMenu} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/lists" element={<Lists />} />
          <Route path='/lists/:listId' element={<ViewSelectedList />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/create" element={<Create />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
