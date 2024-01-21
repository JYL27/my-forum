import React from "react"
import LoginForm from "../components/LoginForm"
import { Box, Container, Typography } from "@mui/material"

function LoginPage() {

    return (
        <Box sx={
            {   
                width: 1,
                height: 1,
                textAlign: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column"
            }}>
            <Container sx={{paddingY: 3}}>
                <Typography variant="h3">
                    Welcome to Gossip!
                </Typography>
            </Container>
            <LoginForm />
        </Box>
    )      
}

export default LoginPage
    
