import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import PostItem  from "./PostItem.tsx"
import { Container, Button, FormControlLabel, Checkbox, Menu } from "@mui/material"
import { QueryContext } from "../../pages/MainPage.tsx"
import { allTags } from "../../types/types.tsx"
import getCookie from "../getCookie.tsx"

function PostList() {
  const { query, tagFilter, setTagFilter } = useContext(QueryContext)
  const navigate = useNavigate()
  const [posts, setPosts] = useState([{id: -1, poster: "", title: "", body: "", tag: ""}]) // sets default values, -1 for id as placeholder
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null) // sets display for filter tag menu
  const open = Boolean(anchorEl)

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

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(e.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    setTagFilter({...tagFilter, [e.target.name]: e.target.checked}) 
  } // for each checkbox, reconstruct object and overwrite the target checkbox
  
  const allCheckboxes = allTags.map((tag) => // creates checkbox for all tags
                                      <span key={tag}>
                                        <FormControlLabel 
                                          control={
                                            <Checkbox
                                              name={tag}
                                              checked={tagFilter[tag]}
                                              onChange={e => handleCheck(e)}
                                            />
                                          }
                                          label={tag}
                                          key={tag} />      
                                      </span>
                                    )

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

  return <Container>
      <Button 
        variant="outlined" 
        color="inherit" 
        onClick={handleClick}
      >
        Filter posts
      </Button>
      <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
      >
          {allCheckboxes}
      </Menu>
    {allPosts}
  </Container>
} 

export default PostList