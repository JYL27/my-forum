import React from "react"
import LoginForm from "../components/LoginForm"
import { Stack, Divider, Container, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

function LoginPage() {
    const navigate = useNavigate()

    function handleNoLogin() {
        navigate("/posts")
    }

    return (
        <Container>
            <Typography variant="h2">
                Welcome to Gossip!
            </Typography>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
            >
                <LoginForm />
            </Stack>
            <Button onClick={handleNoLogin}>View posts without logging in</Button>
        </Container>
    )      
}

export default LoginPage
    
