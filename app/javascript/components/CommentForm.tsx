import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import getToken from "../components/getToken"
import { commentProps } from "../types/types"
import { Button, Box, Container, TextField, Typography } from "@mui/material"

function CommentForm(props: commentProps) {
    const navigate = useNavigate()
    const [commenter, setCommenter] = useState(props.commenter)
    const [body, setBody] = useState(props.body)
    const [commenterError, setCommenterError] = useState(false)
    const [bodyError, setBodyError] = useState(false)

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setFunction: Function) {
        setFunction(e.target.value)
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setCommenterError(false)
        setBodyError(false)

        const url = `/api/v1/posts/${props.postId}/comments`

        if (commenter.length == 0 || body.length == 0) {
            if(commenter.length == 0) {
                setCommenterError(true)
            } 
            if(body.length == 0) {
                setBodyError(true)
            }
            return;
        } 

        const content = {
            commenter,
            body
        }

        fetch(url, {
            method: "POST",
            headers: {
              "X-CSRF-Token": getToken(),
              "Content-Type": "application/json",
            },
            body: JSON.stringify(content)
        })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            throw new Error("Network response was not ok.")
        })
        .then((res) => navigate(`/posts/${props.postId}`))
        .catch((error) => console.log(error.message))
    }

    return (
        <Box margin={2}>
            <Container>
                <Typography variant="h3">
                    Add a comment
                </Typography>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField 
                        onChange={(e) => handleChange(e, setCommenter)}
                        label="Commenter name"
                        value={commenter}
                        variant="outlined"
                        margin="dense"
                        required
                        error={commenterError}/>
                    <TextField 
                        onChange={(e) => handleChange(e, setBody)}
                        label="Comment Body"
                        value={body}
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        multiline
                        rows={5}
                        required
                        error={bodyError}/>
                    <Button
                        type="submit">
                        Add Comment
                    </Button>
                    <Button href="/posts">
                        Back to Posts
                    </Button>
                </form>
            </Container>
        </Box>     
    )
}

export default CommentForm