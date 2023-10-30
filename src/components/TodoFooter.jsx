import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../redux/reducer/todoReducer";

const TodoFooter = () => {
  const dispatch = useDispatch();
  const [activeBtn, setActiveBtn] = useState("all");

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
    setActiveBtn(filter); // Mengatur tombol yang aktif
  };

  return (
    <div className="todo-footer card d-flex flex-row justify-content-evenly">
      <button
        onClick={() => handleFilterChange("all")}
        className={`btn ${activeBtn === "all" ? "btn-info" : ""}`}
      >
        All
      </button>
      <button
        onClick={() => handleFilterChange("active")}
        className={`btn ${activeBtn === "active" ? "btn-info" : ""}`}
      >
        Active
      </button>
      <button
        onClick={() => handleFilterChange("completed")}
        className={`btn ${activeBtn === "completed" ? "btn-info" : ""}`}
      >
        Completed
      </button>
    </div>
  );
};

export default TodoFooter;
