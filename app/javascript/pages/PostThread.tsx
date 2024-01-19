import React, { useState, useEffect, createContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Box, Button } from "@mui/material"
import CommentList from "../components/comments/CommentList"
import PostDisplay from "../components/posts/PostDisplay"
import { postProps } from "../types/types"

export const PostContext = createContext(
  {
    poster: " ",
    id: -1,
    title: " ",
    body: " ",
    tag: "General"
  }
)

type postParams = {
  id: string
}

function PostThread() {
  
    const { id } = useParams<keyof postParams>() as postParams
    const navigate = useNavigate()
    const [post, setPost] = useState<postProps>(
      {
        poster: " ",
        id: parseInt(id),
        title: " ",
        body: " ",
        tag: "General"
      }
    )

    const PostContextProvider = ({ children }) => {
      return (
          <PostContext.Provider value={post}>
              {children}
          </PostContext.Provider>
      )
    }

    useEffect(() => {
        const url = `/api/v1/posts/${id}`
        fetch(url)
          .then((res) => {
            if (res.ok) {
              return res.json()
            }
            throw new Error("The post does not exist.")
          })
          .then((data) => {setPost(data)})
          .catch(() => navigate("/posts"))
    }, [])

    return(
      <Box>
        <PostContextProvider>
          <PostDisplay />
          <CommentList />
        </PostContextProvider>
        <Button href="/posts">Back to Posts</Button>
      </Box>
    ) 
}

export default PostThread