import React, { useState } from "react"
import getToken from "../helpers/getToken"
import { Button, Box, Container, TextField, Typography } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import getCookie from "../helpers/getCookie"

function CommentForm(props: {action: "Add" | "Edit" | "Reply"}) {
    const navigate = useNavigate()
    const { state } = useLocation() // retrieves the location state to fill in the form
    // state variable for comment body, and whether an error should be displayed on submit
    const [body, setBody] = useState(state.body)
    const [bodyError, setBodyError] = useState(false)

    const commenter = getCookie("user") // retrieves commenter value via cookie

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setBody(e.target.value) // on change, set the state variable
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault() // prevents refreshing of the page
        setBodyError(false) // resets error to false

        //sets the appropriate url for http requests
        const url = props.action == ("Add" || "Reply")
                                ? `/api/v1/posts/${state.post_id}/comments` 
                                : `/api/v1/posts/${state.post_id}/comments/${state.id}`

        if(body.length == 0) {
            setBodyError(true)
            return
        } // if user does not key in a body, display an error and prevent submission of form
        


        const content = {
            commenter,
            body,
            parent_id: state.parent_id
        } // constructs json object to pass to backend

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
    } // calls the appropriate method and navigate back to the post

    return (
        <Box margin={2}>
            <Container>
                <Typography className="form-header-text">
                    {props.action == "Add" 
                                ? "Add a comment" 
                                : props.action == "Edit"
                                ? "Edit your comment"
                                : "Add a Reply"}
                </Typography>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField 
                        className="text-field-multi"
                        color="primary"
                        onChange={handleChange}
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
                    <Button href={`/posts/${state.post_id}`}>
                        Back to Post
                    </Button>
                </form>
            </Container>
        </Box>     
    )
}

export default CommentForm