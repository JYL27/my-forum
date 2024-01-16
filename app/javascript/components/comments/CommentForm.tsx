import React, { useState } from "react"
import getToken from "../getToken"
import { Button, Box, Container, TextField, Typography } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"

function CommentForm(props: {action: "Add" | "Edit" | "Reply"}) {
    const navigate = useNavigate()
    const { state } = useLocation()
    const [commenter, setCommenter] = useState(state.commenter)
    const [body, setBody] = useState(state.body)
    const [commenterError, setCommenterError] = useState(false)
    const [bodyError, setBodyError] = useState(false)

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setFunction: Function) {
        setFunction(e.target.value)
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setCommenterError(false)
        setBodyError(false)

        const url = props.action == ("Add" || "Reply")
                                ? `/api/v1/posts/${state.post_id}/comments` 
                                : `/api/v1/posts/${state.post_id}/comments/${state.id}`

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
            body,
            parent_id: state.parent_id
        }

        fetch(url, {
            method: props.action == ("Add" || "Reply") ? "POST" : "PATCH",
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
        .then(() => navigate(`/posts/${state.post_id}`))
        .catch((error) => console.log(error.message))
    }

    return (
        <Box margin={2}>
            <Container>
                <Typography variant="h3">
                    {props.action == "Add" 
                                ? "Add a comment" 
                                : props.action == "Edit"
                                ? "Edit your comment"
                                : "Add a Reply"}
                </Typography>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField 
                        color="primary"
                        onChange={(e) => handleChange(e, setCommenter)}
                        label="Commenter name"
                        value={commenter}
                        variant="outlined"
                        margin="dense"
                        required
                        error={commenterError}/>
                    <TextField 
                        color="primary"
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
                        {props.action == "Add"
                                    ? "Add Comment"
                                    : props.action == "Edit"
                                    ? "Edit Comment"
                                    : "Reply"} 
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