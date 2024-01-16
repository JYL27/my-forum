import React, { useState, useEffect, useContext } from "react"
import CommentItem  from "./CommentItem.tsx"
import { Container, Typography, Stack } from "@mui/material"
import { commentProps } from "../../types/types.tsx"
import { PostContext } from "../../pages/PostThread.tsx"
// type comment object

function CommentList() {
    const post = useContext(PostContext)
    const [comments, setComments] = useState<Array<commentProps>>([{id: -1, 
                                                                    commenter: "", 
                                                                    body: "", 
                                                                    postId: post.id,
                                                                    parentId: undefined}])
    
    useEffect(() => {
        const url = `/api/v1/posts/${post.id}/comments`
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

    function filterComments(comment: any) {
        return comment.post_id == post.id
    }

    const allComments = comments.filter(filterComments)
                                .map((comment, index) => 
                                    <div key={index}>
                                        <CommentItem {...comment}/>
                                    </div>
    )

    return <Container>
        <Stack spacing={1}>
            {allComments.length !== 0 
                            ? allComments 
                            : <Typography fontSize={12}>There are no comments on this post yet!</Typography>}
        </Stack>
    </Container>
}   

export default CommentList