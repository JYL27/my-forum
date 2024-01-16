import React, { useContext } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { MenuItem } from "@mui/material"
import getToken from "../../components/getToken"
import { PostContext } from "../../pages/PostThread"

function PostActionButton(props: {action: string}) {
    const post = useContext(PostContext)
    const params = useParams()
    const navigate = useNavigate()

    function handleDelete() {
        const url = `/api/v1/posts/${params.id}`
  
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

    function handleEdit() {
      navigate("edit", {state: {...post}})
    }

    return (
        <MenuItem 
            onClick={props.action == "Edit" 
                                ? handleEdit 
                                : handleDelete
                    }>
            {props.action}
        </MenuItem>
    )
}

export default PostActionButton