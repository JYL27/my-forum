import React, { useState, useContext } from "react"
import { Typography, Container, IconButton, Tooltip, Menu, MenuItem, Backdrop } from "@mui/material"
import PostActionButton from "./PostActionButton"
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CommentIcon from '@mui/icons-material/Comment'
import { PostContext } from "../../pages/PostThread"
import { useNavigate } from "react-router-dom"
import getCookie from "../helpers/getCookie"

function PostDisplay() {
  const navigate = useNavigate()
  const post = useContext(PostContext) 
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl)
  const user = getCookie("user")

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget) // anchor menu at the clicked target
  }

  function handleCloseMenu() {
    setAnchorEl(null)
  }

  function handleAddComment() {
    navigate("comments/new", 
              {state: 
                { id: -1, 
                  commenter: " ", 
                  body: " ", 
                  post_id: post.id, 
                  parent_id: undefined
                }
              }
            )
  } // if user chooses to add comment, navigate to the new comment page with a default location state

  return (
    <Container className="page-container">
      <Typography className="post-poster">
        {post.poster}
      </Typography>
      <Typography className="post-title">
        {post.title}
      </Typography>
      <Typography className="post-body">
        {post.body}
      </Typography>
      {user == post.poster && 
        <React.Fragment>
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
        </React.Fragment>} {/* if user is the poster, render the post action menu */}
      <Tooltip title="Add a Comment" placement="bottom">
        <IconButton size="large" onClick={handleAddComment}>
          <CommentIcon />
        </IconButton>
      </Tooltip>
    </Container>
  )
}

export default PostDisplay