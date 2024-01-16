import React, { useState } from "react"
import { Button, Card, CardContent, CardActions, Typography, Backdrop } from "@mui/material"
import { commentProps } from "../../types/types"
import getToken from "../getToken"
import CommentForm from "./CommentForm"

function CommentItem(props: commentProps) {
    const [open, setOpen] = useState<boolean>(false)
    
    function deleteComment() {
        const url = `/api/v1/posts/${props.postId}/comments/${props.id}`
    
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

    function handleOpen() {
        setOpen(true)
    }

    function replyToComment() {

    }

    return <Card variant="outlined" sx={{border: 1, 
                                  margin: 1, 
                                  maxHeight: 200, 
                                  maxWidth:500, 
                                  textAlign: "center",
                                  boxShadow: 1}
                                  }>
                <CardContent>
                    <Typography fontSize={14}>
                        {props.commenter}
                    </Typography>
                    <Typography fontSize={12}>
                        {props.body}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={deleteComment}>Delete Comment</Button>
                    <Button size="small" onClick={handleOpen}>Edit Comment</Button>
                    <Backdrop open={open}>
                        <CommentForm {...props} 
                                    action="Edit"
                        />
                    </Backdrop>
                    <Button size="small" onClick={replyToComment}>Reply</Button>
                </CardActions>
            </Card>
}

export default CommentItem