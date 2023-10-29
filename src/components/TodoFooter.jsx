/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const TodoFooter = ({ filterActive }) => {
  const [activeBtn, setActiveBtn] = useState("all");

  return (
    <div className="todo-footer card d-flex flex-row justify-content-evenly">
      <button
        className={`btn ${activeBtn === "all" ? "btn-info" : ""}`}
        onClick={() => {
          setActiveBtn("all");
          filterActive("all");
        }}
      >
        All
      </button>
      <button
        className={`btn ${activeBtn === "active" ? "btn-info" : ""}`}
        onClick={() => {
          setActiveBtn("active");
          filterActive("active");
        }}
      >
        active
      </button>
      <button
        className={`btn ${activeBtn === "completed" ? "btn-info" : ""}`}
        onClick={() => {
          setActiveBtn("completed");
          filterActive("completed");
        }}
      >
        completed
      </button>
    </div>
  );
};

export default TodoFooter;
