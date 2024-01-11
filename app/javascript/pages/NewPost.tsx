import React from "react"
import PostForm from "../components/PostForm"

function NewPost() {
    
    return (
      <PostForm action= "Create" 
                title= ""
                body= ""
                tag= "General"
                id={-1}/>
    )
}

export default NewPost