/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeTodo,
  toggleConfirmed,
  editTodo,
} from "../redux/reducer/todoReducer";
import swal from "sweetalert";
import TodoFooter from "./TodoFooter";

export const TodoBody = () => {
  const [edit, setEdit] = useState({ id: null, text: "" });
  const { todos } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  const handleRemoveTodo = (id) => {
    if (!edit.id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this task!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(removeTodo({ id }));
          swal("Poof! Your task has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your task is safe!");
        }
      });
    }
  };

  const handleToggleConfirmed = (id) => {
    if (!edit.id) {
      dispatch(toggleConfirmed({ id }));
    }
  };

  const handleEditClick = (id, text) => {
    if (!todos[id].confirmed) {
      setEdit({ id, text });
    }
  };

  const handleEditChange = (e) => {
    setEdit({ ...edit, text: e.target.value });
  };

  const handleEditSave = (id) => {
    dispatch(
      editTodo({ id, updatedTodo: { text: edit.text, confirmed: false } })
    );
    setEdit({ id: null, text: "" });

    swal("Task edited successfully!", {
      icon: "success",
    });
  };

  const handleKeyPress = (e, id) => {
    if (e.key === "Enter") {
      handleEditSave(id);
    }
  };

  const filterActive = (filter) => {
    const filtered =
      filter === "active"
        ? todos.filter((todo) => !todo.confirmed)
        : filter === "completed"
        ? todos.filter((todo) => todo.confirmed)
        : todos;

    setFilteredTodos(filtered);
  };

  return (
    <>
      {filteredTodos.map((todo, index) => (
        <div
          className={`todo-body card d-flex flex-row justify-content-between align-items-center`}
          key={index}
        >
          <div>
            {edit.id !== index && (
              <span
                className={`bi ${
                  todo.confirmed ? "bi-check-circle-fill" : "bi-circle"
                }`}
                onClick={() => handleToggleConfirmed(index)}
              ></span>
            )}
          </div>
          <div>
            {edit.id === index ? (
              <input
                className="input-edit"
                type="text"
                value={edit.text}
                onChange={handleEditChange}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            ) : (
              <li
                style={{
                  textDecoration: todo.confirmed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </li>
            )}
          </div>
          <div>
            {edit.id === index ? (
              <span
                // className="bi bi-save2"
                onClick={() => handleEditSave(index)}
              >
                <button className="btn btn-warning">Save</button>
              </span>
            ) : (
              !todo.confirmed && (
                <span
                  className="bi bi-pencil-square"
                  onClick={() => handleEditClick(index, todo.text)}
                ></span>
              )
            )}
            {edit.id !== index && (
              <span
                className="bi bi-trash-fill"
                onClick={() => handleRemoveTodo(index)}
              ></span>
            )}
          </div>
        </div>
      ))}
      <TodoFooter filterActive={filterActive} />
    </>
  );
};
