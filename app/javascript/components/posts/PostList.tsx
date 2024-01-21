import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import PostItem  from "./PostItem.tsx"
import { Container } from "@mui/material"
import { QueryContext } from "../../pages/MainPage.tsx"
import { defaultPost } from "../../types/types.tsx"

function PostList() {
  const { query, tagFilter } = useContext(QueryContext)
  const navigate = useNavigate()
  const [posts, setPosts] = useState([defaultPost]) 
  // sets default values, -1 for id as placeholder
  
  useEffect(() => {
    const url = "/api/v1/posts"
    fetch(url) // GET request
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      throw new Error("There was a problem with displaying posts.")
    })
    .then((data) => setPosts(data))
    .catch(() => navigate("/")) // if main page unable to render, redirect to root page
  }, [query, tagFilter])

  function filterSearch(post: {title: string, body: string, tag: string}) {
    const queryWords = query.split(" ") // splits query by whitespace into individual words

    function checker(text: string) { // checks if title or body of post contains the words in the query
      for(let i = 0; i < queryWords.length; i++) {
        if(text.includes(queryWords[i])) {
          return true
        }
      }
      return false
    } // returns posts that contain any of the words in the query in its title or body and are of the tags allowed 
    return ( checker(post.title) || checker(post.body) ) && tagFilter[post.tag]
  }

  const allPosts = posts.filter(filterSearch).map((post, index) => 
      <div key={index}>
          <PostItem {...post}/> { /*creates a post item for all posts in the database*/ }
      </div>
  )

  return (
  <Container sx={
    {   
      width: 1,
      height: 1,
      textAlign: "center",
      alignItems: "center",
      display: "flex",
      flexDirection: "column"
    }}
  >
    {allPosts}
  </Container>)
} 

export default PostList