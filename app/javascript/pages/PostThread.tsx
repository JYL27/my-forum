import React, { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from "@mui/material"
import getToken from "../components/getToken"

function PostThread() {
    const params = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState({ id: params.id, title: "", body: ""})

    useEffect(() => {
        const url = `/api/v1/show/${params.id}`
        fetch(url)
          .then((res) => {
            if (res.ok) {
              return res.json()
            }
            throw new Error("The post does not exist.")
          })
          .then((data) => setPost(data))
          .catch(() => navigate("/posts"))
    }, [params.id])

    function deletePost() {
      const url = `/api/v1/destroy/${params.id}`
  
      fetch(url, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": getToken(),
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
          throw new Error("The post does not exist.")
        })
        .then(() => navigate("/posts"))
        .catch((error) => console.log(error.message))
    }

    return <div>
        <section>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </section>
        <Button onClick={deletePost}>Delete Post</Button>
        <Link to="/edit" state= {{...post}}>
        Edit Post
        </Link>
        <Link to="/posts" className="btn btn-link mt-3">
          Back to posts
        </Link>
      </div>
}

export default PostThread