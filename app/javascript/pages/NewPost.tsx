import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// style
function NewPost() {
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")

    const onChange = (event, setFunction) => {
        setFunction(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const url = "/api/v1/posts/create"
    
        if (title.length == 0 || body.length == 0)
          return;

        const content = {
            title,
            body,
            image
        }
        // not sure about the error, program seems to work fine
        fetch(url, {
          method: "POST",
          headers: {
            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(content)
        })
          .then((res) => {
            if (res.ok) {
              return res.json()
            }
            throw new Error("Network response was not ok.")
          })
          .then((res) => navigate(`/posts/${res.id}`))
          .catch((error) => console.log(error.message))
    
    }

    return (
        <div className="container mt-5">
            <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
                <h1 className="font-weight-normal mb-5">
                Create a New Post
                </h1>
                <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="postTitle">Post Title</label>
                    <input
                    type="text"
                    name="title"
                    id="postTitle"
                    className="form-control"
                    required
                    onChange={(event) => onChange(event, setTitle)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="postBody">Body</label>
                    <input
                    type="text"
                    name="body"
                    id="postBody"
                    className="form-control"
                    required
                    onChange={(event) => onChange(event, setBody)}
                    />
                </div>
                {/*add option to attach images*/}
                <button type="submit" className="btn custom-button mt-3">
                    Create Post
                </button>
                <Link to="/posts" className="btn btn-link mt-3">
                    Back to posts
                </Link>
                </form>
            </div>
            </div>
        </div>
    )
}

export default NewPost