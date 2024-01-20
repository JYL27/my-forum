import React from "react"
import { Box } from "@mui/material"
import PostForm from "../components/posts/PostForm"
import NavBar from "../components/NavBar"

function EditPost() {
    return (
        <Box>
            <NavBar />
            <PostForm action="Edit"/>
        </Box>
    )
}

export default EditPost