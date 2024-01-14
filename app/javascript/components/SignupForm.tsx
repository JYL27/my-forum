import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Typography, TextField, Container } from "@mui/material"
import getToken from "../components/getToken"

function SignupForm() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [passwordConfirmationError, setPasswordConfirmationError] = useState(false)

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setFunction: Function) {
        setFunction(e.target.value)
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setEmailError(false)
        setUsernameError(false)
        setPasswordError(false)
        setPasswordConfirmationError(false)

        const url = "http://localhost:3001/signup"

        if (email.length == 0 || username.length == 0 || password.length == 0 || passwordConfirmation.length == 0) {
            if(email.length == 0) {
                setEmailError(true)
            } 
            if(username.length == 0) {
                setUsernameError(true)
            }

            if(password.length == 0) {
                setPasswordError(true)
            }
            
            if(passwordConfirmation.length == 0) {
                setPasswordConfirmationError(true)
            }
            return;
        }

        const content = {
            email,
            name: username,
            password,
            passwordConfirmation
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
            Sign Up!
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
                onChange={(e) => handleChange(e, setUsername)}
                label="Username"
                value={username}
                variant="outlined"
                margin="dense"
                required
                error={usernameError}>
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
            <TextField
                onChange={(e) => handleChange(e, setPasswordConfirmation)}
                label="Password Confirmation"
                value={passwordConfirmation}
                variant="outlined"
                margin="dense"
                required
                error={passwordConfirmationError}>
            </TextField>
            <Button type="submit" variant="outlined">
                Signup
            </Button>
        </form>
    </Container>
}

export default SignupForm