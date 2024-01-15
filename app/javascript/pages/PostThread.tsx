import React, { useState, useEffect, createContext } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Box, Button, Typography, Container, Stack, Tooltip, IconButton, Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import CommentList from "../components/comments/CommentList"
import CommentIcon from '@mui/icons-material/Comment'
import CommentForm from "../components/comments/CommentForm"
import PostDisplay from "../components/posts/PostDisplay"
import { postProps } from "../types/types"

export const PostContext = createContext({
  setAction: (_: "Add" | "Edit") => {},
  setOpen: (_: boolean) => {}
})

type postParams = {
  postId: string
}

function PostThread() {
    const { postId } = useParams<keyof postParams>() as postParams
    const navigate = useNavigate()
    const [post, setPost] = useState<postProps>()
    const [open, setOpen] = useState(false)
    const [action, setAction] = useState<"Add" | "Edit">("Add")

    useEffect(() => {
        const url = `/api/v1/posts/${postId}`
        fetch(url)
          .then((res) => {
            if (res.ok) {
              return res.json()
            }
            throw new Error("The post does not exist.")
          })
          .then((data) => setPost(data))
          .catch(() => navigate("/posts"))
    }, [postId])

    return <PostContext.Provider value={{setAction, setOpen}}>
      <Box>
        <PostDisplay />
          <CommentList postId={parseInt(postId)}/>
        <Accordion expanded={open}>
          <AccordionSummary>
          </AccordionSummary>
          <AccordionDetails>
            <CommentForm action={action} id={5} postId={parseInt(postId)} commenter="" body="" parentId={undefined}/>
          </AccordionDetails>
        </Accordion>
      </Box>
    </PostContext.Provider>
}

export default PostThread