import React, { useContext } from "react"
import { Typography, Container, IconButton, Tooltip } from "@mui/material"
import PostActionMenu from "./PostActionMenu"
import CommentIcon from '@mui/icons-material/Comment'
import { PostContext } from "../../pages/PostThread"
import { useNavigate } from "react-router-dom"
import getCookie from "../helpers/getCookie"

function PostDisplay() {
  const navigate = useNavigate()
  const post = useContext(PostContext) 
  const user = getCookie("user")

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
      {user == post.poster && <PostActionMenu />} {/* if user is the poster, render the post action menu */}
      <Tooltip title="Add a Comment" placement="bottom">
        <IconButton size="large" onClick={handleAddComment}>
          <CommentIcon />
        </IconButton>
      </Tooltip>
    </Container>
  )
}

export default PostDisplay