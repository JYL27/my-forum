import React, { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { MenuItem } from "@mui/material"
import getToken from "../helpers/getToken"
import { PostContext } from "../../pages/PostThread"

function PostActionButton(props: {action: string}) {
  const post = useContext(PostContext) 
  const params = useParams() // retrieve params id for requesting delete request
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
  } // sends delete request to backend

  function handleEdit() {
    navigate("edit", {state: {...post}})
  } // if user chooses to edit the post, navigate to edit post form with the post props as the location state

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