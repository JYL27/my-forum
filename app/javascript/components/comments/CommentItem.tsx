import React from "react"
import { Button, Card, CardContent, CardActions, Typography, Box } from "@mui/material"
import { commentProps } from "../../types/types"
import { useNavigate } from "react-router-dom"
import getCookie from "../helpers/getCookie"
import ReplyIcon from '@mui/icons-material/Reply'
import CommentActionMenu from "./CommentActionMenu"

function CommentItem(props: commentProps) {
  const navigate = useNavigate()
  const user = getCookie("user")

  function replyToComment() {
      navigate("comments/new", 
                {state: 
                  { id: -1, 
                    commenter: "", 
                    body: "", 
                    post_id: props.post_id, 
                    parent_id: props.id
                  }
                }
              )
  } // if user chooses to reply to comment, navigate to the reply to the new reply page with a default reply location state
 
  return (
    <Card sx={
      {   
          border: 1, 
          margin: 1, 
          minHeight: 75,
          height: "fit-content",
          width: 500, 
          textAlign: "left",
      }}
      variant="outlined"
    >
      <Box sx={{display: "flex"}}>
        <Box sx={{width: 475}}>
          <CardContent>
            <Typography fontSize={16} fontWeight={3}>
                {props.body}
            </Typography>
          </CardContent>
          <CardActions sx={
            {
              height: 50,
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1,
              gridTemplateRows: 'auto',
              gridTemplateAreas: `"commenter . reply"`
            }}

          >
            <Box sx={{gridArea: "commenter"}}>
              <Typography fontSize={12}>
                  Comment by: {props.commenter}
              </Typography>
            </Box>
            <Button 
              sx={{gridArea: "reply", width: 175}}
              size="small"
              onClick={replyToComment} 
              startIcon={<ReplyIcon />}
            >
              Reply to Comment
            </Button>
          </CardActions>
        </Box>
        {user == props.commenter && <CommentActionMenu {...props}/>}
      </Box>
    </Card>
  )
}

export default CommentItem