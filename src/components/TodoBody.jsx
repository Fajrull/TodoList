import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeTodo,
  editTodo,
  toggleConfirmed,
} from "../redux/reducer/todoReducer";
import swal from "sweetalert";

export const TodoBody = () => {
  const todos = useSelector((state) => state.todos.todos);
  const filter = useSelector((state) => state.todos.filter);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleRemoveTodo = (id) => {
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
  };

  const handleEditTodo = (id) => {
    setEditMode(id);
    setEditedText(todos[id].text);
  };

  const saveEditedTodo = (id) => {
    dispatch(
      editTodo({
        id,
        updatedTodo: {
          text: editedText,
          confirmed: todos[id].confirmed,
        },
      })
    );
    setEditMode(null);
    swal("Task edited successfully!", {
      icon: "success",
    });
  };

  const handleToggleConfirmed = (id) => {
    dispatch(toggleConfirmed({ id }));
  };

  const handleEnterKey = (event, id) => {
    if (event.key === "Enter") {
      saveEditedTodo(id);
    }
  };

  return (
    <>
      {todos.map((todo, index) => {
        if (
          filter === "all" ||
          (filter === "active" && !todo.confirmed) ||
          (filter === "completed" && todo.confirmed)
        ) {
          return (
            <div
              key={`todo-${index}`}
              className={`todo-body card d-flex flex-row justify-content-between align-items-center`}
            >
              <div>
                {editMode !== index && (
                  <span
                    className={`bi ${
                      todo.confirmed ? "bi-check-circle-fill" : "bi-circle"
                    }`}
                    onClick={() => handleToggleConfirmed(index)}
                  ></span>
                )}
              </div>
              <div>
                {editMode === index ? (
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    onKeyDown={(e) => handleEnterKey(e, index)}
                    className="input-edit"
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
                {editMode !== index && (
                  <span
                    className="bi bi-pencil-square"
                    onClick={() => handleEditTodo(index)}
                  ></span>
                )}
                {editMode !== index && (
                  <span
                    className="bi bi-trash-fill"
                    onClick={() => handleRemoveTodo(index)}
                  ></span>
                )}
                {editMode === index && (
                  <button
                    onClick={() => saveEditedTodo(index)}
                    className="btn btn-warning"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          );
        }
        return null; // Jika filter tidak cocok, tidak ada elemen yang di-render
      })}
    </>
  );
};
