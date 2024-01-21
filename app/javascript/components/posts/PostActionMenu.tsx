import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Menu, MenuItem, Dialog, DialogActions, DialogContent, 
          DialogContentText, DialogTitle, Button, IconButton } from "@mui/material"
import getToken from "../helpers/getToken"
import { PostContext } from "../../pages/PostThread"
import MoreVertIcon from '@mui/icons-material/MoreVert'

function PostActionMenu() {
  const post = useContext(PostContext) 
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl)
  const [open, setOpen] = useState<boolean>(false)

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget) // sets the anchor of the menu at the click target
  }

  function handleCloseMenu() {
    setAnchorEl(null)
  }

  function handleOpenDialog() {
    setOpen(true)
  }

  function handleCloseDialog() {
    setOpen(false)
  }

  function handleDelete() {
    const url = `/api/v1/posts/${post.id}`

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
    <React.Fragment>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleOpenDialog}>
          Delete Post
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          Edit Post
        </MenuItem>
      </Menu>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
      >
        <DialogTitle>
          Are you sure you want to delete Post?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDialog}>No</Button>
          <Button onClick={handleDelete}>Yes</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default PostActionMenu