import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import { UserContext } from "./contexts/UserContext";

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
        <Home />
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
