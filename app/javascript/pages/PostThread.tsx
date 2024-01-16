import React, { useState, useEffect, createContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Box, Button } from "@mui/material"
import CommentList from "../components/comments/CommentList"
import PostDisplay from "../components/posts/PostDisplay"
import { postProps } from "../types/types"

export const PostContext = createContext({
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
    const { id } = useParams<keyof postParams>()
    const navigate = useNavigate()
    const [post, setPost] = useState<postProps>({
                                                  id: -1,
                                                  title: " ",
                                                  body: " ",
                                                  tag: "General"
                                                  }
                                                )

    useEffect(() => {
        const url = `/api/v1/posts/${id}`
        fetch(url)
          .then((res) => {
            if (res.ok) {
              return res.json()
            }
            throw new Error("The post does not exist.")
          })
          .then((data) => setPost(data))
          .catch(() => navigate("/posts"))
    }, [id])

    return <PostContext.Provider value={post}>
      <Box>
        <PostDisplay />
        <CommentList />
      </Box>
      <Button href="/posts">Back to Posts</Button>
    </PostContext.Provider>
}

export default PostThread