import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  filter: "all", // Add a new filter state
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(
        (todo, index) => index !== action.payload.id
      );
    },
    toggleConfirmed: (state, action) => {
      const todo = state.todos[action.payload.id];
      if (todo) {
        todo.confirmed = !todo.confirmed;
      }
    },
    editTodo: (state, action) => {
      const { id, updatedTodo } = action.payload;
      const todo = state.todos.find((todo, index) => index === id);
      if (todo) {
        todo.text = updatedTodo.text;
        todo.confirmed = updatedTodo.confirmed;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload; // Add a new action to set the filter
    },
  },
});

export const { addTodo, removeTodo, toggleConfirmed, editTodo, setFilter } =
  todosSlice.actions;

export default todosSlice.reducer;
