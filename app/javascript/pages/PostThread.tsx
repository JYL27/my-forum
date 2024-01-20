import React, { createContext } from "react"
import { useParams } from "react-router-dom"
import { Box, Button } from "@mui/material"
import CommentList from "../components/comments/CommentList"
import PostDisplay from "../components/posts/PostDisplay"
import { useQuery } from "@tanstack/react-query"
import { defaultPost, postParams } from "../types/types"

export const PostContext = createContext(
  defaultPost
) // exports post context to PostDisplay and CommentList

function PostThread() {

  const { id } = useParams<keyof postParams>() as postParams // retrieve url params 
  const { isLoading, isError, data: post, error } = useQuery({
    queryFn: () => 
        fetch(`/api/v1/posts/${id}`)
        .then((res) => res.json(),
        ),
    queryKey: ['post'],
  }) // gets post query from backend with the params id to retrieve correct post

  if(isLoading) {
      return <span>Loading</span>
  }

  if(isError) {
      return <span>Error: {error.message}</span>
  }

  const PostContextProvider = ({ children }) => {
    return (
        <PostContext.Provider value={post}>
            {children}
        </PostContext.Provider>
    )
  }

  return(
    <Box>
      <PostContextProvider>
        <PostDisplay />
        <CommentList />
      </PostContextProvider>
      <Button 
        className="button"
        href="/posts"
      >
        Back to Posts
      </Button>
    </Box>
  ) 
}

export default PostThread