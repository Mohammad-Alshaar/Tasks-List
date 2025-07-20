import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import { Grid, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useMemo, useReducer, useState } from "react";
import { useContext } from "react";
import { TodosContext } from "../contexts/TodosContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useToast } from "../contexts/ToastContext";
// import { todosReducer } from "../reducers/todosReducer";
import { useTodos, useTodosDispatch } from "../contexts/TodosContext";
export default function TodoList() {
  const [textInput, setTextInput] = useState("");
  // const { todosList2, setTodosList } = useContext(TodosContext);
  // const [todosList, dispatch] = useReducer(todosReducer, []);
  const todosList = useTodos();
  const dispatch = useTodosDispatch();
  const [groupDisplay, setGroupDisplay] = useState("all");

  const [open, setOpen] = useState(false);
  const [todoForDelete, setTodoForDelete] = useState("");

  const [openEdit, setOpenEdit] = useState(false);

  const { showHideToast } = useToast();
  function changeGroup(e) {
    setGroupDisplay(e.target.value);
  }
  let FinishedGroup = useMemo(() => {
    console.log("Completed");
    return todosList.filter((t) => {
      return t.isComplete;
    });
  }, [todosList]);
  let nonFinishedGroup = useMemo(() => {
    console.log("not Completed");
    return todosList.filter((t) => {
      return !t.isComplete;
    });
  }, [todosList]);

  let todosToBeRendered = todosList;

  if (groupDisplay === "completed") {
    todosToBeRendered = FinishedGroup;
  } else if (groupDisplay === "nonCompleted") {
    todosToBeRendered = nonFinishedGroup;
  } else {
    todosToBeRendered = todosList;
  }
  function HandleClick() {
    dispatch({ type: "added", payload: { title: textInput } });
    showHideToast("The task has been successfully added");
    setTextInput("");
  }
  useEffect(() => {
    dispatch({ type: "get" });
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  function showDeleteDialog(todos) {
    setTodoForDelete(todos);
    setOpen(true);
  }
  function handleConfirm() {
    dispatch({ type: "deleted", payload: todoForDelete });
    showHideToast("The task was deleted successfully");
    setOpen(false);
  }
  const [editCurrrentTask, setEditCurrrentTask] = useState({
    title: "",
    description: "",
  });
  /////////////////////////////////////////////////////////////////////////////
  function showUpdateDialog(todos) {
    setTodoForDelete(todos);
    setOpenEdit(true);
  }

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  function handleConfirmEdit() {
    dispatch({
      type: "updated",
      payload: {
        todoForDelete: todoForDelete,
        editCurrrentTask: editCurrrentTask,
      },
    });
    console.log(editCurrrentTask.title);
    console.log(editCurrrentTask.description);
    showHideToast("The task has been modified successfully");
    setOpenEdit(false);
  }
  ///////////////////////////////////////////////////////////////////////////////////
  const todosJsx = todosToBeRendered.map((t) => {
    return (
      <Todo
        key={t.id}
        todos={t}
        showDelete={showDeleteDialog}
        showUpdate={showUpdateDialog}
      />
    );
  });
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
          Are you sure you want to delete the task?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once deleted, you cannot recover it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ color: "red", fontWeight: "bold" }}
          >
            Undo
          </Button>
          <Button
            onClick={handleConfirm}
            autoFocus
            sx={{ color: "red", fontWeight: "bold" }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle
          sx={{ fontWeight: "bold", background: "#0e2a4e", color: "#fff" }}
        >
          Edit Task
        </DialogTitle>
        <DialogContent sx={{ background: "#fff" }}>
          <TextField
            sx={{ borderRadius: 2, mt: 3 }}
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="Title"
            fullWidth
            variant="outlined"
            value={todoForDelete.title}
            onChange={(e) => {
              setTodoForDelete({
                ...todoForDelete,
                title: e.target.value,
              });
            }}
          />
          <TextField
            required
            margin="dense"
            id="desc"
            name="desc"
            label="Description"
            fullWidth
            variant="outlined"
            value={todoForDelete.description}
            onChange={(e) => {
              setTodoForDelete({
                ...todoForDelete,
                description: e.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseEdit}
            sx={{ fontWeight: "bold", color: "#dc3545" }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleConfirmEdit}
            sx={{ fontWeight: "bold", color: "#0e2a4e" }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Container maxWidth="sm">
        <Card
          sx={{
            minWidth: 275,
            backgroundColor: "#0e2a4e",
            maxHeight: "80vh",
            overflow: "scroll",
            scrollbarWidth: "none",
            p: 4,
            borderRadius: 4,
            color: "#fff",
            boxShadow: 4,
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              mb={3}
              sx={{ fontWeight: "bold", color: "#black" }}
            >
              To-do List
            </Typography>
            <Divider />
            {/* Filter Buttons */}
            <ToggleButtonGroup
              exclusive
              aria-label="text alignment"
              style={{ marginTop: "20px" }}
              value={groupDisplay}
              onChange={changeGroup}
            >
              <ToggleButton
                value="all"
                aria-label="left aligned"
                sx={{
                  backgroundColor: "#2b4672",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                All
              </ToggleButton>
              <ToggleButton
                value="completed"
                aria-label="centered"
                sx={{
                  backgroundColor: "#2b4672",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Finished
              </ToggleButton>
              <ToggleButton
                value="nonCompleted"
                aria-label="right aligned"
                sx={{
                  backgroundColor: "#2b4672",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Unfinished
              </ToggleButton>
            </ToggleButtonGroup>
            {/* Filter Buttons */}
            {todosJsx}
            <Grid container spacing={2} sx={{ marginTop: "20px" }}>
              <Grid size={9}>
                <TextField
                  fullWidth
                  id="filled-basic"
                  label="Add Task"
                  variant="filled"
                  sx={{
                    height: "100%",
                    backgroundColor: "#fff",
                    borderRadius: 2,
                  }}
                  value={textInput}
                  onChange={(e) => {
                    setTextInput(e.target.value);
                  }}
                />
              </Grid>
              <Grid size={3}>
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    height: "100%",
                    fontWeight: "bold",
                    background: "#153e75",
                  }}
                  onClick={() => {
                    HandleClick();
                  }}
                  disabled={textInput.length == 0}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
