import React from "react"
import { Box } from "@mui/material"
import PostForm from "../components/posts/PostForm"
import NavBar from "../components/NavBar"

function NewPost() {
    return (
        <Box>
            <NavBar />
            <PostForm action= "Create" />
        </Box>
    )
}

export default NewPost