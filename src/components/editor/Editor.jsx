import React from "react";
import { useNavigate } from "react-router-dom";

const Editor = () => {
  const navigate = useNavigate();
  const move = (path) => {
    navigate(`${path}`);
  };
  return (
    <div className="content__wrapper">
      <p>Editor Landing Page</p>
      <span
        onClick={() => {
          move("/create");
        }}
      >
        Create
      </span>
    </div>
  );
};

export default Editor;
