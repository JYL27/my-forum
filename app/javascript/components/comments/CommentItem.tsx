import React, { useState } from "react"
import { Button, Card, CardContent, CardActions, Typography, Menu, IconButton, MenuItem } from "@mui/material"
import { commentProps } from "../../types/types"
import getToken from "../getToken"
import { useNavigate } from "react-router-dom"
import getCookie from "../getCookie"
import MoreVertIcon from '@mui/icons-material/MoreVert'

function CommentItem(props: commentProps) {
    const navigate = useNavigate()
    const user = getCookie("user")
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl)

    function handleClick(event: React.MouseEvent<HTMLElement>) {
      setAnchorEl(event.currentTarget)
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
    }

    function editComment() {
        navigate(`comments/${props.id}/edit`, {state: {...props}})

    }

    function replyToComment() {
        navigate("comments/new", {state: {id: -1, 
                                            commenter: " ", 
                                            body: " ", 
                                            post_id: props.post_id, 
                                            parent_id: props.id
                                        }
                                    })
    }

    return <Card variant="outlined" sx={
            {   border: 1, 
                margin: 1, 
                maxHeight: 200, 
                maxWidth:500, 
                textAlign: "center",
                boxShadow: 1
            }
        }>
        <CardContent>
            <Typography fontSize={16}>
                {props.commenter}
            </Typography>
            <Typography fontSize={12}>
                {props.body}
            </Typography>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
            >
              <MenuItem onClick={replyToComment}>
                Reply to Comment
              </MenuItem>
              {user == props.commenter && 
                <>
                    <MenuItem onClick={deleteComment}>
                        Delete Comment
                    </MenuItem>
                    <MenuItem onClick={editComment}>
                        Edit Comment
                    </MenuItem>
                </>}
            </Menu>
        </CardContent>
    </Card>
}

export default CommentItem