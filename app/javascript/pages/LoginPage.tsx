import React from "react"
import LoginForm from "../components/LoginForm"
import { Box, Container, Typography, Button } from "@mui/material"

function LoginPage() {

    return (
        <Box>
            <Container className="page-container">
                <Typography className="header-text">
                    Welcome to Gossip!
                </Typography>
            </Container>
            <LoginForm />
        </Box>
    )      
}

export default LoginPage
    
