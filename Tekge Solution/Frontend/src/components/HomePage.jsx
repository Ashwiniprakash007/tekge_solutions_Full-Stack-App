import React from "react";
import { Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>TODOS</h1>
      <div style={{display:"flex",justifyContent:"center", gap:"10px"}}>
        <Button variant="contained" onClick={() => navigate("/register")}>
          Register
        </Button>
        <Button variant="contained" onClick={() => navigate("/login")}>
          Login
        </Button>
      </div>
    </div>
  );
};

export { HomePage };
