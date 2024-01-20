import React from "react"
import { Box } from "@mui/material"
import CommentForm from "../components/comments/CommentForm"
import NavBar from "../components/NavBar"

function NewComment() {
    return (
        <Box>
            <NavBar />
            <CommentForm action="Reply" />
        </Box>
    )
}

export default NewComment