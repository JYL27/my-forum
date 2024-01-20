import React, { useState } from "react"
import { Tooltip, Card, CardContent, Typography, Menu, IconButton, MenuItem } from "@mui/material"
import { commentProps } from "../../types/types"
import getToken from "../helpers/getToken"
import { useNavigate } from "react-router-dom"
import getCookie from "../helpers/getCookie"
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CommentIcon from '@mui/icons-material/Comment'

function CommentItem(props: commentProps) {
    const navigate = useNavigate()
    const user = getCookie("user")
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl)

    function handleClick(event: React.MouseEvent<HTMLElement>) {
      setAnchorEl(event.currentTarget) // sets the anchor of the menu at the click target
    }

    function handleCloseMenu() {
      setAnchorEl(null)
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

    function replyToComment() {
        navigate("comments/new", 
                  {state: 
                    { id: -1, 
                      commenter: " ", 
                      body: " ", 
                      post_id: props.post_id, 
                      parent_id: props.id
                    }
                  }
                )
    } // if user chooses to reply to comment, navigate to the reply to the new reply page with a default reply location state

  return (
    <Card variant="outlined" sx={
        {   border: 1, 
            margin: 1, 
            maxHeight: 200, 
            maxWidth:500, 
            textAlign: "center",
            boxShadow: 1
        }
      }
    >
      <CardContent>
        <Typography className="comment-commenter">
            {props.commenter}
        </Typography>
        <Typography className="comment-body">
            {props.body}
        </Typography>
        <Tooltip title="Add a Reply" placement="bottom">
          <IconButton size="large" onClick={replyToComment}>
            <CommentIcon />
          </IconButton>
        </Tooltip>
          {user == props.commenter && 
            <React.Fragment>
              <IconButton onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={deleteComment}>
                  Delete Comment
                </MenuItem>
                <MenuItem onClick={editComment}>
                  Edit Comment
                </MenuItem>
              </Menu>
            </React.Fragment>
          }
      </CardContent>
    </Card>
  )
}

export default CommentItem