import React, { useState } from "react"
import { Menu, MenuItem, Dialog, DialogActions, DialogContent, 
            DialogContentText, DialogTitle, Button, IconButton, Box } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert'
import getToken from "../helpers/getToken"
import { useNavigate } from "react-router-dom"
import { commentProps } from "../../types/types"

function CommentActionMenu(props: commentProps) {
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

    function deleteComment() {
        const url = `/api/v1/posts/${props.post_id}/comments/${props.id}`
    
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
            throw new Error("The comment does not exist.")
        })
        .then(() => window.location.reload())
        .catch((error) => console.log(error.message))
    } // requests a delete request to backend, and reloads after it's been deleted

    function editComment() {
        navigate(`comments/${props.id}/edit`, {state: {...props}})
    } // if user chooses to edit comment, navigate to the edit comment page with the comment props as the location state


    return (
        <Box>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={handleOpenDialog}>
                    Delete Comment
                </MenuItem>
                <MenuItem onClick={editComment}>
                    Edit Comment
                </MenuItem>
            </Menu>
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>
                    Are you sure you want to delete the comment?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    This action is irreversible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseDialog}>No</Button>
                    <Button onClick={deleteComment}>Yes</Button>
                </DialogActions>
            </Dialog>
        </Box>

    )
}

export default CommentActionMenu