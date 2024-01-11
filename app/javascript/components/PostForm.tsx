import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import getToken from "../components/getToken"
import { allTags, formProps } from "../types/types"
import { Button, Box, Container, TextField, Typography, Select, SelectChangeEvent, MenuItem } from "@mui/material"
// confirmation message

function PostForm(props: formProps) {
    const navigate = useNavigate()
    const [title, setTitle] = useState(props.title)
    const [body, setBody] = useState(props.body)
    const [tag, setTag] = useState(props.tag)
    const [titleError, setTitleError] = useState(false)
    const [bodyError, setBodyError] = useState(false)
    const [tagError, setTagError] = useState(false)

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setFunction: Function) {
        setFunction(e.target.value)
    }

    const tagMenuItems = allTags.map((tag) => <MenuItem key={tag} value={tag}>
                                                    {tag}
                                                </MenuItem>)

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setTitleError(false)
        setBodyError(false)
        setTagError(false)

        const url = props.action == "Create" ? "/api/v1/posts/create" : `/api/v1/posts/${props.id}`

        if (title.length == 0 || body.length == 0 || tag.length == 0) {
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
        }

        fetch(url, {
            method: props.action == "Create" ? "POST" :"PATCH",
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
            .then((res) => navigate(`/posts/${res.id}`))
            .catch((error) => console.log(error.message))
    }

    return (
        <Box margin={2}>
            <Container>
                    <Typography variant="h3">
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