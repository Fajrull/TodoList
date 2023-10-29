/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/reducer/todoReducer";

const TodoHeader = () => {
  const [add, setAdd] = useState("");
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    setAdd(e.target.value);
  };

  const handleForm = (e) => {
    e.preventDefault();

    if (add.trim() === "") {
      return;
    }

    dispatch(addTodo({ text: add, confirmed: false }));
    setAdd("");
  };

  // console.log(add);
  return (
    <form
      className="d-flex justify-content-center todo-header"
      onSubmit={handleForm}
    >
      <input
        type="text"
        placeholder="What to do"
        onChange={handleAdd}
        value={add}
      />
      <button className="bi bi-send-plus rounded-circle"></button>
    </form>
  );
};

export default TodoHeader;
