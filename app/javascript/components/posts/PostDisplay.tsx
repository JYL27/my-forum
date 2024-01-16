import React, { useState, useContext } from "react"
import { Typography, Container, IconButton, Tooltip, Menu, MenuItem, Backdrop } from "@mui/material"
import PostActionButton from "./PostActionButton"
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CommentForm from "../comments/CommentForm"
import CommentIcon from '@mui/icons-material/Comment'
import { PostContext } from "../../pages/PostThread"
import { useNavigate } from "react-router-dom"

function PostDisplay() {
    const navigate = useNavigate()
    const post = useContext(PostContext)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl)

    function handleClick(event: React.MouseEvent<HTMLElement>) {
      setAnchorEl(event.currentTarget)
    }

    function handleCloseMenu() {
      setAnchorEl(null)
    }

    function handleAddComment() {
      navigate("comments/new", {state: {id: -1, 
                                          commenter: " ", 
                                          body: " ", 
                                          post_id: post.id, 
                                          parent_id: undefined
                                        }
                                      })
    }

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
                open={openMenu}
                onClose={handleCloseMenu}
            >
              <PostActionButton action="Edit"/>
              <PostActionButton action="Delete"/>
            </Menu>
            <Tooltip title="Add a Comment" placement="bottom">
              <IconButton size="large" onClick={handleAddComment}>
                <CommentIcon />
              </IconButton>
            </Tooltip>
        </Container>
    )
}

export default PostDisplay