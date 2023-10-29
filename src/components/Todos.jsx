/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import TodoTitle from "./TodoTitle";
import TodoHeader from "./TodoHeader";
import { TodoBody } from "./TodoBody";

const Todos = () => {
  return (
    <>
      <TodoTitle />
      <TodoHeader />
      <TodoBody />
    </>
  );
};

export default Todos;
