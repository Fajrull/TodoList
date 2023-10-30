/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import TodoTitle from "./TodoTitle";
import TodoHeader from "./TodoHeader";
import { TodoBody } from "./TodoBody";
import TodoFooter from "./TodoFooter";

const Todos = () => {
  return (
    <>
      <TodoTitle />
      <TodoHeader />
      <TodoBody />
      <TodoFooter />
    </>
  );
};

export default Todos;
