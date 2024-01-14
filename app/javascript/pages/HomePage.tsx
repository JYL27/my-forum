import React from "react"
import LoginForm from "../components/LoginForm"
import SignupForm from "../components/SignupForm"
import { Stack, Divider, Container, Typography } from "@mui/material"

function HomePage() {
    return (<Container>
        <Typography variant="h2">
            Welcome to Gossip!
        </Typography>
        <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        >
            <LoginForm />
            <SignupForm />
        </Stack>
    </Container>
        
    )      
}

export default HomePage
    
