import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material";
// import { TodosContext } from "./contexts/TodosContext";
import { v4 as uuidv4 } from "uuid";
// import { useState } from "react";
import { ToastProvider } from "./contexts/ToastContext";
import { TodosProvider } from "./contexts/TodosContext";
const todos = [
  {
    id: uuidv4(),
    title: "Do Homework",
    description: "dsf kdf fdfs fdgkl",
    isComplete: false,
  },
  {
    id: uuidv4(),
    title: "Play",
    description: "fdg sdsd'p gfgf fd",
    isComplete: false,
  },
  {
    id: uuidv4(),
    title: "Travel",
    description: "dslg [spvbm,fpd]",
    isComplete: false,
  },
];
const theme = createTheme({
  typography: {
    fontFamily: ["workSans"],
  },
  palette: {
    primary: {
      main: "#4A90E2",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
          <div
            className="App"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            {/* <TodosContext.Provider value={{ todosList, setTodosList }}> */}
            <TodoList />
            {/* </TodosContext.Provider> */}
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
