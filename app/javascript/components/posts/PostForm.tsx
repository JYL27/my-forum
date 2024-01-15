import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import getToken from "../../components/getToken"
import { allTags, postFormProps } from "../../types/types"
import { Button, Box, Container, TextField, Typography, MenuItem } from "@mui/material"
// try to implement confirmation message
// initial value not setting properly
function PostForm(props: postFormProps) {
    const navigate = useNavigate()
    // state variables for each element in the post object excluding id, and whether an error should be displayed on submit
    const [title, setTitle] = useState(props.title)
    const [body, setBody] = useState(props.body)
    const [tag, setTag] = useState(props.tag)
    const [titleError, setTitleError] = useState(false)
    const [bodyError, setBodyError] = useState(false)
    const [tagError, setTagError] = useState(false)

    console.log(props.title)
    console.log(title)

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
        const url = props.action == "Create" ? "/api/v1/posts" : `/api/v1/posts/${props.id}`

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
                <Typography variant="h3">
                    {/*displays correct action*/}
                    {props.action == "Create" ? "Create a New Post" : "Edit your Post"}
                </Typography>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField 
                        onChange={(e) => handleChange(e, setTitle)}
                        label="Post Title"
                        value={title}
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        required
                        error={titleError}/>
                    <TextField 
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