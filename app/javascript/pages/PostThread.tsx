import React, { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, Typography, Container, Stack, Tooltip, IconButton, Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import getToken from "../components/getToken"
import CommentList from "../components/CommentList"
import CommentIcon from '@mui/icons-material/Comment'
import CommentForm from "../components/CommentForm"

function PostThread() {
    const params = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState({ id: params.id, title: "", body: "", tag: ""})

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

    function deletePost() {
      const url = `/api/v1/posts/${params.id}`
  
      fetch(url, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": getToken(),
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
          throw new Error("The post does not exist.")
        })
        .then(() => navigate("/posts"))
        .catch((error) => console.log(error.message))
    }

    return <Container>
      <Stack>
        <Typography variant="h3">
          {post.title}
        </Typography>
        <Typography fontSize={15}>
          {post.body}
        </Typography>
      </Stack>
      <Stack direction="row">
        <Button onClick={deletePost}>Delete Post</Button>
        <Link to="edit" state= {{...post}}>
        Edit Post
        </Link>
        <Link to="/posts" className="btn btn-link mt-3">
          Back to posts
        </Link>
      </Stack>
      <CommentList postId={params.id}/>
      <Accordion>
        <AccordionSummary expandIcon={<CommentIcon />}>
          <Typography fontSize={12}>
            Add a Comment
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CommentForm id={-1} postId={params.id} commenter="" body="" />
        </AccordionDetails>
      </Accordion>
    </Container>
}

export default PostThread