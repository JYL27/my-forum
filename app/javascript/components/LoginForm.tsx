import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Typography, TextField, Container } from "@mui/material"
import { useCookies } from "react-cookie"

function LoginForm() {
    const navigate = useNavigate()
    const [cookies, setCookies] = useCookies(["user"])
    const [username, setUsername] = useState("")
    const [usernameError, setUsernameError] = useState(false)

    function handleLogin(user: string | object) {
        setCookies("user", user, { path: "/", sameSite: "strict"})
        navigate("posts")
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setUsername(e.target.value)
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setUsernameError(false)

        if(username.length == 0) {
            setUsernameError(true)
            return
        }

        handleLogin(username)
    }

    return <Container>
        <Typography variant="h4">
            Login!
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
                onChange={handleChange}
                label="Username"
                value={username}
                variant="outlined"
                margin="dense"
                required
                error={usernameError}>
            </TextField>
            <Button type="submit" variant="outlined">
                Login
            </Button>
        </form>
    </Container>
}


export default LoginForm