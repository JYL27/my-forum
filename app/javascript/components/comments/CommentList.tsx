import React, { useState, useEffect, useContext, createContext } from "react"
import CommentBlock  from "./CommentBlock.tsx"
import { Container, Typography, Stack } from "@mui/material"
import { commentProps } from "../../types/types.tsx"
import { PostContext } from "../../pages/PostThread.tsx"
import { useQuery } from "@tanstack/react-query"

let def: number | undefined

export const CommentContext = createContext(
    [
        {id: -1, 
            commenter: " ", 
            body: " ", 
            post_id: -1,
            parent_id: def
        }
    ]
)

function CommentList() {
    const post = useContext(PostContext)
    const { isLoading, isError, data: comments, error } = useQuery({
        queryFn: () => 
            fetch(`/api/v1/posts/${post.id}/comments`)
            .then((res) => res.json(),
            ),
        queryKey: ['comments'],
    })

    if(isLoading) {
        return <span>Loading</span>
    }

    if(isError) {
        return <span>Error: {error.message}</span>
    }

    console.log(comments)
    
    const CommentContextProvider = ({ children }) => {
        return (
            <CommentContext.Provider value={comments}>
                {children}
            </CommentContext.Provider>
        )
    }    

    function filterComments(comment: commentProps) {
        return comment.post_id == post.id && comment.parent_id == null
    }

    const allRootComments = comments.filter(filterComments)
                                .map((comment) => 
                                    <div key={comment.id}>
                                        <CommentBlock {...comment}/>
                                    </div>    
                                )
    
    return <CommentContextProvider>
        <Container>
            <Stack spacing={1}>
                {allRootComments.length !== 0 
                                ? allRootComments 
                                : <Typography fontSize={12}>
                                    There are no comments on this post yet!
                                </Typography>
                            }
            </Stack>
        </Container>
    </CommentContextProvider>

}   

export default CommentList