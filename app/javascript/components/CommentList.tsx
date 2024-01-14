import React, { useState, useEffect, useContext } from "react"
import CommentItem  from "./CommentItem.tsx"
import { Container, Typography, Stack } from "@mui/material"

function CommentList() {
    const [comments, setComments] = useState([{id: -1, commenter: "", body: ""}])
    useEffect(() => {
        const url = "/api/v1/comments"
        fetch(url)
          .then((res) => {
            if (res.ok) {
              return res.json()
            }
            throw new Error("Network response was not ok.")
          })
          .then((data) => setComments(data))
          .catch((error) => console.log(error))
    }, [])

    const allComments = comments.map((comment, index) => 
        <div key={index}>
            <CommentItem id={comment.id} commenter={comment.commenter} body={comment.body}/>
        </div>
    )
    return <Container>
        <Stack spacing={1}>
            {allComments || <Typography fontSize={14}>There are no comments on this post yet</Typography>}
        </Stack>
    </Container>
}   

export default CommentList