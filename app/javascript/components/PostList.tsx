import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import PostItem  from "./PostItem.tsx"
import { Container } from "@mui/material"
import { QueryContext } from "../pages/MainPage"

function PostList() {
    const { query, tagFilter } = useContext(QueryContext)
    const navigate = useNavigate()
    const [posts, setPosts] = useState([{id: -1, title: "", body: "", tag: ""}])

    useEffect(() => {
        const url = "/api/v1/posts/index"
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

    function queryFilter(post: {title: string, body: string}) {
      const queryWords = query.split(" ")

      function checker(text: string) {
        for(let i = 0; i < queryWords.length; i++) {
          if(text.includes(queryWords[i])) {
            return true
          }
        }
        return false
      }
      return checker(post.title) || checker(post.body)
    }

    const allPosts = posts.filter(queryFilter).map((post, index) => 
        <div key={index}>
            <PostItem id={post.id} title={post.title} body={post.body} tag={post.tag}/>
        </div>
    )

    return <Container>
        {allPosts}
    </Container>
} 

export default PostList