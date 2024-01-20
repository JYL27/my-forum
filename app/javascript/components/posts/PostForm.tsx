import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import getToken from "../helpers/getToken"
import { allTags } from "../../types/types"
import { Button, Box, Container, TextField, Typography, MenuItem } from "@mui/material"
import getCookie from "../helpers/getCookie"
// try to implement confirmation message

function PostForm(props: {action: "Create" | "Edit"}) {
    const navigate = useNavigate()
    const { state } = useLocation() // retrieves the location state to fill in the form
    // state variables for each element in the post object excluding id, and whether an error should be displayed on submit
    const [title, setTitle] = useState(state.title)
    const [body, setBody] = useState(state.body)
    const [tag, setTag] = useState(state.tag)
    const [titleError, setTitleError] = useState(false)
    const [bodyError, setBodyError] = useState(false)
    const [tagError, setTagError] = useState(false)

    const poster = getCookie("user") // sets poster as the user

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setFunction: Function) {
        setFunction(e.target.value) // sets the respective element variable on change of text field
    }

    const tagMenuItems = allTags.map((tag) => <MenuItem key={tag} value={tag}>
                                                    {tag}
                                                </MenuItem>) // creates dropdown menu item for each tag

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setTitleError(false) // resets all error to false
        setBodyError(false)
        setTagError(false)
        
        // checks if user wishes to create a new post or edit an existing post. URL changes accordingly
        const url = props.action == "Create" ? "/api/v1/posts" : `/api/v1/posts/${state.id}`

        if (title.length == 0 || body.length == 0 || tag.length == 0) {
            // if any fields are blank, don't process form submission. 
            // Check each field individually and displays errors accordingly
            if(title.length == 0) {
                setTitleError(true)
            } 
            if(body.length == 0) {
                setBodyError(true)
            }

            if(tag.length == 0) {
                setTagError(true)
            }
            return;
        } 

        const content = {
            poster,
            title,
            body,
            tag
        } // constructs JSON to pass to backend

        fetch(url, {
            // checks if user wishes to create a new post or edit an existing post. URL and HTTP method changes accordingly
            method: props.action == "Create" ? "POST" :"PATCH",
            headers: {
              "X-CSRF-Token": getToken(), // handles CSRF token retrieval
              "Content-Type": "application/json",
            },
            body: JSON.stringify(content)
        })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            throw new Error("Unable to process.")
        })
        .then((res) => navigate(`/posts/${res.id}`)) // after new post created or edit made, redirect back to the post
        .catch((error) => console.log(error.message))
    }

    return (
        <Box margin={2}>
            <Container>
                <Typography className="form-header-text">
                    {/*displays correct action*/}
                    {props.action == "Create" ? "Create a New Post" : "Edit your Post"}
                </Typography>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField 
                        className="text-field-reg"
                        onChange={(e) => handleChange(e, setTitle)}
                        label="Post Title"
                        value={title}
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        required
                        error={titleError}/>
                    <TextField 
                        className="text-field-multi"
                        onChange={(e) => handleChange(e, setBody)}
                        label="Post Body"
                        value={body}
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        multiline
                        rows={5}
                        required
                        error={bodyError}/>
                    <TextField 
                        select
                        onChange={(e) => handleChange(e, setTag)}
                        label="Post Tag"
                        value={tag}
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        required
                        error={tagError}
                    >
                        {tagMenuItems}
                    </TextField>
                    <Button
                        type="submit">
                        {/*displays correct action*/}
                        {props.action} Post
                    </Button>
                    <Button href="/posts">
                        Back to Posts
                    </Button>
                </form>
            </Container>
        </Box>    
    )
}

export default PostForm