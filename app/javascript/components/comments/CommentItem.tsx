import React from "react"
import { Tooltip, Card, CardContent, Typography, IconButton } from "@mui/material"
import { commentProps } from "../../types/types"
import { useNavigate } from "react-router-dom"
import getCookie from "../helpers/getCookie"
import CommentIcon from '@mui/icons-material/Comment'
import CommentActionMenu from "./CommentActionMenu"

function CommentItem(props: commentProps) {
  const navigate = useNavigate()
  const user = getCookie("user")

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
          {user == props.commenter && <CommentActionMenu {...props}/>}
      </CardContent>
    </Card>
  )
}

export default CommentItem