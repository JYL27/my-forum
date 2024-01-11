import React from "react"
import { useLocation } from "react-router-dom"
import PostForm from "../components/PostForm"


function EditPost() {
    const location = useLocation()
    const title = location.state.title
    const body = location.state.body
    const tag = location.state.tag
    const id = location.state.id
    
    return (
        <PostForm action= "Edit" 
                  title={title} 
                  body={body}
                  tag={tag}
                  id={id}
        />
    )
}

export default EditPost