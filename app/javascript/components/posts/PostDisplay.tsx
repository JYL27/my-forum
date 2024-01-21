import React, { useContext } from "react"
import { Typography, Container, Divider, Paper, Button, Box } from "@mui/material"
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
    <Container>
      <Paper sx={
        {
          height: 300,
          margin: 2,
          textAlign: "left",
          display: "flex"
        }}>
          <Box sx={
            {
              margin: 2,
              width: 24/25
            }}>
            <Typography 
              fontSize={32}
              fontWeight={8}
            >
              {post.title}
            </Typography>
            <Typography 
              fontSize={14}
            >
              Post by: {post.poster}
            </Typography>
            <Divider />
            <Typography 
              fontSize={20}
              fontWeight={2}
            >
              {post.body}
            </Typography>
          </Box>
        {user == post.poster && <PostActionMenu />} {/* if user is the poster, render the post action menu */}
      </Paper>
      <Button 
        onClick={handleAddComment} 
        startIcon={<CommentIcon />}
      >
        Add a Comment
      </Button>
    </Container>
  )
}

export default PostDisplay