import React, { useState, useEffect } from "react"
import NavBar from "../components/NavBar"
import { useNavigate } from "react-router-dom"
import { Typography, Button, Card, CardActions, CardContent } from "@mui/material"
// style

function Posts() {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([{id: -1, title: "", body: "", image: ""}])

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
            <Card variant="outlined" sx={{border: 1, 
                                      margin: 1, 
                                      maxHeight: 200, 
                                      maxWidth:500, 
                                      textAlign: "center",
                                      boxShadow: 1}}>
                <CardContent sx={{paddingBottom: 1}}>
                    <Typography variant="h4">
                        {post.title}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" href={`/posts/${post.id}`}>Read Post</Button>
                </CardActions>
            </Card>
        </div>
    )

    return <>
        <NavBar/>
        <div className="vw-100 vh-100 d-block align-items-center justify-content-center">
            {allPosts}
        </div>
    </>
}

export default Posts