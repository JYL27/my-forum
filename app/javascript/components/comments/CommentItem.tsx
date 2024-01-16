import React from "react"
import { Button, Card, CardContent, CardActions, Typography } from "@mui/material"
import { commentProps } from "../../types/types"
import getToken from "../getToken"
import { useNavigate } from "react-router-dom"


function CommentItem(props: commentProps) {
    const navigate = useNavigate()

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
        </CardContent>
        <CardActions>
            <Button size="small" onClick={deleteComment}>Delete Comment</Button>
            <Button size="small" onClick={editComment}>Edit Comment</Button>
            <Button size="small" onClick={replyToComment}>Reply to Comment</Button>
        </CardActions>
    </Card>
}

export default CommentItem