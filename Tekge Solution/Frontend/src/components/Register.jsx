import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";
const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate =useNavigate()
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePaasordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async () => {
        const payload = {
            email,
            password
        };
    
        try {
            const response = await fetch(`http://localhost:8080/user/register`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            if (response.ok) {
                alert("SignUp successful");
                navigate("/login");
            } else {
                throw new Error("Something went wrong");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong");
        }
    };
    
    return(
        <div>
            {/* <br/>
            <input type="email" placeholder="email" value={email} onChange={handleEmailChange}></input> 
            <br/>
            <input type="password" placeholder="password" value={password} onChange={handlePaasordChange}></input>
            <br/>
            <button onClick={handleSubmit}>Signup</button> */}
             <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Signup
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
                            Signup
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
        </div>
    )
}

export  {Register};