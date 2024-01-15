import React, { useEffect, useState } from "react"
import PostForm from "../components/posts/PostForm"
import { postProps } from "../types/types"
import { useNavigate, useParams } from "react-router-dom"


function EditPost() {
    const params = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState<postProps>({id: -1, title: " ", body: " ", tag: "General"})

    useEffect(() => {
        const url = `/api/v1/posts/${params.id}`
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

    return (
        <PostForm {...post} action="Edit"/>
    )
}

export default EditPost