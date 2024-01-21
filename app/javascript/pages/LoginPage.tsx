import React from "react"
import LoginForm from "../components/LoginForm"
import { Box, Container, Typography, Button } from "@mui/material"

function LoginPage() {

    return (
        <Box>
            <Container className="page-container">
                <Typography className="display-1">
                    Welcome to Gossip!
                </Typography>
            </Container>
            <LoginForm />
        </Box>
    )      
}

export default LoginPage
    
