import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Typography, TextField, Container } from "@mui/material"
import getToken from "../components/getToken"

function LoginForm() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)


    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setFunction: Function) {
        setFunction(e.target.value)
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setEmailError(false)
        setPasswordError(false)

        const url = "http://localhost:3001/login"

        if (email.length == 0 || password.length == 0) {
            if(email.length == 0) {
                setEmailError(true)
            } 

            if(password.length == 0) {
                setPasswordError(true)
            }
            
            return;
        }

        const content = {
            email,
            password
        }

        fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
            "X-CSRF-Token": getToken(),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*"
            },
            body: JSON.stringify(content)
        })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            throw new Error("Network response was not ok.")
        })
        .then((res) => navigate("/posts"))
        .catch((error) => console.log(error.message))
    }

    return <Container>
        <Typography variant="h4">
            Login!
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
                onChange={(e) => handleChange(e, setEmail)}
                label="Email"
                value={email}
                variant="outlined"
                margin="dense"
                required
                error={emailError}>
            </TextField>
            <TextField
                onChange={(e) => handleChange(e, setPassword)}
                label="Password"
                value={password}
                variant="outlined"
                margin="dense"
                required
                error={passwordError}>
            </TextField>
            <Button type="submit" href="/posts" variant="outlined">
                Login
            </Button>
        </form>
    </Container>
}


export default LoginForm