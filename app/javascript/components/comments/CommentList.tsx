import React, { useState, useEffect } from "react"
import CommentItem  from "./CommentItem.tsx"
import { Container, Typography, Stack } from "@mui/material"
import { commentProps } from "../../types/types.tsx"
// type comment object

function CommentList(props: {postId: number}) {
    const [comments, setComments] = useState<Array<commentProps>>([{id: -1, 
                                                                    postId: props.postId, 
                                                                    commenter: "", 
                                                                    body: "", 
                                                                    parentId: undefined}])
    
    useEffect(() => {
        const url = `/api/v1/posts/${props.postId}/comments`
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
        return comment.post_id.toString() == props.postId
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