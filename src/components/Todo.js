import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import { useContext, useState } from "react";
import { TodosContext, useTodosDispatch } from "../contexts/TodosContext";
import { useToast } from "../contexts/ToastContext";

export default function Todo({ todos, showDelete, showUpdate }) {
  const handleClickOpen = () => {
    showDelete(todos);
  };

  // ====================

  // ====================
  const { showHideToast } = useToast();
  // const { todosList, setTodosList } = useContext(TodosContext);
  const dispatch = useTodosDispatch();
  const handleClickOpenEdit = () => {
    showUpdate(todos);
  };
  function HandleCheckClick() {
    dispatch({ type: "toggledCompleted", payload: todos });
    if (todos.isComplete) showHideToast("Removed from completed tasks");
    else showHideToast("Mission accomplished");
  }

  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          marginTop: 2,
          backgroundColor: "#fff",
          color: "rgba(0,0,0,0.8)",
          boxShadow: 4,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={7}>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  textAlign: "start",
                  fontWeight: "bold",
                  textDecorationLine: todos.isComplete
                    ? "line-through"
                    : "none",
                }}
              >
                {todos.title}
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  textAlign: "start",
                  textDecorationLine: todos.isComplete
                    ? "line-through"
                    : "none",
                }}
              >
                {todos.description}
              </Typography>
            </Grid>
            <Grid
              size={5}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <IconButton
                aria-label="done"
                sx={{
                  border: "2px solid #28a745",
                  background: todos.isComplete ? "#28a745" : "white",
                  color: todos.isComplete ? "white" : "#28a745",
                }}
                className="iconButtonDone"
                onClick={() => HandleCheckClick()}
              >
                <DoneIcon />
              </IconButton>
              <IconButton
                aria-label="edit"
                sx={{
                  border: "2px solid #007BFF",
                  color: "white",
                  background: "#007BFF",
                }}
                className="iconButtonEdit"
                onClick={handleClickOpenEdit}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                sx={{
                  border: "2px solid #dc3545",
                  color: "white",
                  background: "#dc3545",
                }}
                className="iconButtonDelete"
                onClick={handleClickOpen}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
