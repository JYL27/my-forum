import React from "react"
import { Box } from "@mui/material"
import CommentForm from "../components/comments/CommentForm"
import NavBar from "../components/NavBar"

function EditComment() {
    return (
        <Box>
            <NavBar />
            <CommentForm action="Edit" />
        </Box>
    )
}

export default EditComment