import React, { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from "@mui/material"
import getToken from "../components/getToken"
// style
// edit

function PostThread() {
    const params = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState({title: "", body: "", image: ""})

    useEffect(() => {
        const url = `/api/v1/show/${params.id}`
        fetch(url)
          .then((res) => {
            if (res.ok) {
              return res.json()
            }
            throw new Error("Network response was not ok.")
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
          throw new Error("Network response was not ok.")
        })
        .then(() => navigate("/posts"))
        .catch((error) => console.log(error.message))
    }
    /*
    function editPost() {
      const url = `/api/v1/posts/edit`
  
      fetch(url, {
        method: "PATCH",
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
          throw new Error("Network response was not ok delete.")
        })
        .then(() => navigate("/posts"))
        .catch((error) => console.log(error.message))
    }*/

    return <div>
        <section>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </section>
        <Button onClick={deletePost}>Delete Post</Button>
        {/*<Button onClick={editPost}>Edit Post</Button>*/}
        <Link to="/posts" className="btn btn-link mt-3">
          Back to posts
        </Link>
      </div>
}

export default PostThread