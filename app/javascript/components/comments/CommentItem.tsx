import React, { useContext } from "react"
import { Button, Card, CardContent, CardActions, Typography } from "@mui/material"
import { commentProps } from "../../types/types"
import getToken from "../getToken"
import { PostContext } from "../../pages/PostThread"

function CommentItem(props: commentProps) {
    const { setAction, setOpen } = useContext(PostContext)
    
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

    function editComment() {

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
                    <Button size="small" onClick={() => {setAction("Edit"); setOpen(true)}}>Edit Comment</Button>
                    <Button size="small" onClick={replyToComment}>Reply</Button>
                </CardActions>
            </Card>
}

export default CommentItem