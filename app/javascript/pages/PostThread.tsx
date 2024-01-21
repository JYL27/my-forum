import React, { createContext } from "react"
import { useParams } from "react-router-dom"
import { Box } from "@mui/material"
import CommentList from "../components/comments/CommentList"
import PostDisplay from "../components/posts/PostDisplay"
import { useQuery } from "@tanstack/react-query"
import { defaultPost, postParams } from "../types/types"
import NavBar from "../components/NavBar"

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
    <Box sx={
      {   
          width: 1,
          height: 1,
          alignItems: "center",
          display: "flex",
          flexDirection: "column"
      }}>
      <NavBar />
      <PostContextProvider>
        <PostDisplay />
        <CommentList />
      </PostContextProvider>
    </Box>
  ) 
}

export default PostThread