import { v4 as uuidv4 } from "uuid";
export const todosReducer = (currentTodos, action) => {
  switch (action.type) {
    case "added": {
      const newTask = {
        id: uuidv4(),
        title: action.payload.title,
        description: "",
        isComplete: false,
      };
      const newtodo = [...currentTodos, newTask];
      localStorage.setItem("todo", JSON.stringify(newtodo));
      return newtodo;
    }
    case "deleted": {
      const newTodos = currentTodos.filter((t) => {
        return t.id !== action.payload.id;
      });
      localStorage.setItem("todo", JSON.stringify(newTodos));
      return newTodos;
    }
    case "updated": {
      const newEditTask = currentTodos.map((t) => {
        if (t.id === action.payload.todoForDelete.id) {
          return {
            ...t,
            title: action.payload.todoForDelete.title,
            description: action.payload.todoForDelete.description,
          };
        } else return t;
      });
      localStorage.setItem("todo", JSON.stringify(newEditTask));
      return newEditTask;
    }
    case "get": {
      const todosStorage = JSON.parse(localStorage.getItem("todo")) ?? [];
      return todosStorage;
    }
    case "toggledCompleted": {
      const todo = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          const newTodo = { ...t, isComplete: !t.isComplete };
          return newTodo;
        }
        return t;
      });
      localStorage.setItem("todo", JSON.stringify(todo));
      return todo;
    }
    default: {
      throw Error("Unknown Action");
    }
  }
};
