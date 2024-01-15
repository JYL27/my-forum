import React, { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, Typography, Container, IconButton, Menu } from "@mui/material"
import getToken from "../../components/getToken"
import PostActionButton from "./PostActionButton"
import MoreVertIcon from '@mui/icons-material/MoreVert'

function PostDisplay() {
    const params = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState({ id: params.id, title: "", body: "", tag: ""})
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    function handleClick(event: React.MouseEvent<HTMLElement>) {
      setAnchorEl(event.currentTarget);
    }

    function handleClose() {
      setAnchorEl(null);
    }

    useEffect(() => {
        const url = `/api/v1/posts/${params.id}`
        fetch(url)
          .then((res) => {
            if (res.ok) {
              return res.json()
            }
            throw new Error("The post does not exist.")
          })
          .then((data) => setPost(data))
          .catch(() => navigate("/posts"))
    }, [params.id])

    return (
        <Container>
            <Typography variant="h3">
                {post.title}
            </Typography>
            <Typography fontSize={13}>
                {post.body}
            </Typography>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <PostActionButton action="Edit"/>
                <PostActionButton action="Delete"/>
            </Menu>
        </Container>
    )
}

export default PostDisplay