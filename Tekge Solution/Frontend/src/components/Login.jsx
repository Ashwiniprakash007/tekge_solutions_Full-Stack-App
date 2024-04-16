import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate=useNavigate()
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePaasordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async () => {
        const payload ={
            email,
            password
        }
        const response = await fetch("http://localhost:8080/user/login", {
            method : "POST",
            body : JSON.stringify(payload),
            headers: {
                "Content-Type" : "application/json"
            }, 
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            const {id}=res;
            console.log(id,"d")
            alert("Login Success")
            localStorage.setItem("token", res.token)
           navigate(`/todos/${id}`)
        })
        .catch((err) => alert("Login Failed")
        
        )
       
        
    }
    return(
        <div>
            {/* <br/>
            <input type="email" placeholder="email" value={email} onChange={handleEmailChange}></input> 
            <br/>
            <input type="password" placeholder="password" value={password} onChange={handlePaasordChange}></input>
            <br/>
            <button onClick={handleSubmit}>Login</button> */}
              <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={handlePaasordChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
        </div>
    )
}

export  {Login};