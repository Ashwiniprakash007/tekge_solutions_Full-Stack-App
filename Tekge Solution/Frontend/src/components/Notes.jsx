import React, { useState, useEffect } from "react";
import CreateNotes from "./CreateNotes";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

// import { Delete } from "./Delete";
const Notes = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [data, setData] = useState([]);
  const userId = id;
  const navigate = useNavigate();
  const getNotes = async () => {
    await fetch(`http://localhost:8080/todos/read`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        userId,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData([...res]);
      })
      .catch((err) => console.log(err));
  };
  const getAdd = async (payload) => {
    await fetch("http://localhost:8080/todos/create", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        getNotes();
      })
      .catch((err) => {
        alert("something went wrong");
      });
  };
  useEffect(() => {
    getNotes();
  }, []);

  console.log(data);
 
  const Delete = async (noteId) => {
    await fetch(`http://localhost:8080/todos/${noteId}/delete`, {
      method: "DELETE",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        getNotes();
      })
      .catch((err) => {
        alert("something went wrong");
      });
  };

  const updateTodoStatus = async (noteId) => {
    try {
      await fetch(`http://localhost:8080/todos/${noteId}/update`, {
        method: "PUT",
        body: JSON.stringify({ status: "completed" }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      getNotes();
    } catch (error) {
      console.error("Error updating todo status:", error);
      alert("Something went wrong");
    }
  };









  // return token ? (
  //   <div style={{ marginTop: "100px" }}>
  //     <CreateNotes add={getAdd} />
  //     <table style={{ margin: "auto" }}>
  //       <thead>
  //         <tr>
  //           <th>
  //             <h2>Task Name</h2>
  //           </th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {data?.map((el) => (
  //           <tr>
  //             <td> {el.taskname} </td>
  //             <td> {el.status} </td>

  //             <td> {el.tag} </td>
  //             {/* <td><button colorScheme={"blue"} onClick={()=> editing(el._id)}>Edit</button> </td> */}
  //             <td>
  //               <button onClick={() => updateTodoStatus(el._id)}>
  //                 Change Status
  //               </button>
  //               <button onClick={() => Delete(el._id)}>Delete</button>
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // ) : (
  //   <h3>Please login again</h3>
  // );

  return token ? (
    <div style={{ marginTop: "100px" }}>
      <CreateNotes add={getAdd} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Task Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Status</Typography>
              </TableCell>
              {/* <TableCell>
                <Typography variant="h6">Tag</Typography>
              </TableCell> */}
              <TableCell>
                <Typography variant="h6">Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((el) => (
              <TableRow key={el._id}>
                <TableCell>{el.taskname}</TableCell>
                <TableCell>{el.status}</TableCell>
                {/* <TableCell>{el.tag}</TableCell> */}
                <TableCell>
                  <Button onClick={() => updateTodoStatus(el._id)}>Change Status</Button>
                  <Button onClick={() => Delete(el._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ) : (
    <Typography variant="h3">Please login again</Typography>
  );
};

export { Notes };
