import React from "react"
import LoginForm from "../components/LoginForm"
import { Stack, Divider, Container, Typography } from "@mui/material"


function LoginPage() {

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
        </Container>
    )      
}

export default LoginPage
    
