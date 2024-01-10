import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PostItem  from "./PostItem.tsx"
import { Container } from "@mui/material"

function PostList() {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([{id: -1, title: "", body: ""}])

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
    }, [])

    const allPosts = posts.map((post, index) => 
        <div key={index}>
            <PostItem id={post.id} title={post.title} body={post.body}/>
        </div>
    )

    return <Container>
        {allPosts}
    </Container>
} 

export default PostList