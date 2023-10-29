/* eslint-disable no-unused-vars */
import React from "react";

const TodoFooter = () => {
  return (
    <div className="todo-footer card d-flex flex-row justify-content-between">
      <div>
        <p>0 items left</p>
      </div>
      <div className="d-flex gap-3">
        <p>All</p>
        <p>Active</p>
        <p>Complated</p>
      </div>
      <div>
        <p>Clear Complated</p>
      </div>
    </div>
  );
};

export default TodoFooter;
