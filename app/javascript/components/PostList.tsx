import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import PostItem  from "./PostItem.tsx"
import { Container, Button, FormControlLabel, Checkbox, Menu } from "@mui/material"
import { QueryContext } from "../pages/MainPage"
import { allTags } from "../types/types.tsx"

function PostList() {
    const { query, tagFilter, setTagFilter } = useContext(QueryContext)
    const navigate = useNavigate()
    const [posts, setPosts] = useState([{id: -1, title: "", body: "", tag: ""}])
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(e.currentTarget)
    }
    const handleClose = () => {
      setAnchorEl(null)
    }

    function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
      setTagFilter({...tagFilter, [e.target.name]: e.target.checked})
  }
  
    const allCheckboxes = allTags.map((tag) => <span key={tag}>
                                                <FormControlLabel 
                                                            control={
                                                            <Checkbox
                                                                name={tag}
                                                                checked={tagFilter[tag]}
                                                                onChange={e => handleCheck(e)}/>
                                                            }
                                                            label={tag}
                                                            key={tag}>
                                                </FormControlLabel>
                                                    
                                                </span>)

    useEffect(() => {
        const url = "/api/v1/posts"
        fetch(url)
          .then((res) => {
            if (res.ok) {
              return res.json()
            }
            throw new Error("Network response was not ok.")
          })
          .then((data) => setPosts(data))
          .catch(() => navigate("/"))
    }, [query, tagFilter])

    function filterSearch(post: {title: string, body: string, tag: string}) {
      const queryWords = query.split(" ")

      function checker(text: string) {
        for(let i = 0; i < queryWords.length; i++) {
          if(text.includes(queryWords[i])) {
            return true
          }
        }
        return false
      }
      return ( checker(post.title) || checker(post.body) ) && tagFilter[post.tag]
    }

    const allPosts = posts.filter(filterSearch).map((post, index) => 
        <div key={index}>
            <PostItem id={post.id} title={post.title} body={post.body} tag={post.tag}/>
        </div>
    )

    return <Container>
                <Button variant="outlined" color="inherit" onClick={handleClick}>Filter posts</Button>
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