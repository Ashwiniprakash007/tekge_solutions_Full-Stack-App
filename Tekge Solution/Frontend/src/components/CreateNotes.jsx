import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { TextField, Button, Container, Grid } from "@mui/material";

const CreateNotes = ({ add }) => {
  const [taskname, settaskname] = useState("");
  const params = useParams();
  const { id } = params;
  const userId = id;

  const handletaskname = (e) => {
    settaskname(e.target.value);
  };

  const handleSubmit = async () => {
    const payload = {
      taskname,
      userId,
    };
    add(payload);
  };
  return (
    <div>
      {/* <input
        type="text"
        placeholder="taskname"
        value={taskname}
        onChange={handletaskname}
      ></input>
      <button onClick={handleSubmit}>createTodos</button> */}
      <Container maxWidth="sm">
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Task Name"
                        value={taskname}
                        onChange={handletaskname}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Create Todos
                    </Button>
                </Grid>
            </Grid>
        </Container>
    </div>
  );
};

export default CreateNotes;
