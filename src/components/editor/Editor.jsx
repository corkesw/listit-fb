import React from "react";
import { useNavigate } from "react-router-dom";

const Editor = () => {
  const navigate = useNavigate();
  const move = (path) => {
    navigate(`${path}`);
  };
  return (
    <div>
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
