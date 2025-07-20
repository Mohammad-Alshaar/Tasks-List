import { createContext, useReducer, useContext } from "react";
import { todosReducer } from "../reducers/todosReducer";
export const TodosContext = createContext([]);
export const DispatchContext = createContext(null);
export const TodosProvider = ({ children }) => {
  const [todosList, dispatch] = useReducer(todosReducer, []);
  return (
    <TodosContext.Provider value={todosList}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  return useContext(TodosContext);
};
export const useTodosDispatch = () => {
  return useContext(DispatchContext);
};
