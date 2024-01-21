import React, { useContext, createContext } from "react"
import CommentBlock  from "./CommentBlock.tsx"
import { Container, Typography, Box } from "@mui/material"
import { commentProps } from "../../types/types.tsx"
import { PostContext } from "../../pages/PostThread.tsx"
import { useQuery } from "@tanstack/react-query"

let def: number | undefined

export const CommentContext = createContext(
    [
        {   id: -1, 
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
    }) // requests and retrieves comments 

    if(isLoading) {
        return <span>Loading</span>
    }

    if(isError) {
        return <span>Error: {error.message}</span>
    }
    
    const CommentContextProvider = ({ children }) => {
        return (
            <CommentContext.Provider value={comments}>
                {children}
            </CommentContext.Provider>
        )
    }    

    function filterComments(comment: commentProps) {
        return comment.post_id == post.id && comment.parent_id == null
    } // filter all comments that belong to the post and are root comments i.e. not replies

    const allRootComments = comments.filter(filterComments)
                                .map((comment: commentProps) => 
                                    <Box key={comment.id}>
                                        <CommentBlock {...comment}/>
                                    </Box>    
                                )
    
    return (
        <Container>
            <CommentContextProvider>
                <ul style={{ listStyleType: "none" }}>
                    {allRootComments.length !== 0 
                                    ? allRootComments 
                                    : <Typography variant="h6" fontWeight={5}>
                                        There are no comments on this post yet!
                                    </Typography>
                        } {/*if there are no comments to be rendered, render a placeholder text */}
                </ul>
            </CommentContextProvider>
        </Container>
    )

}   

export default CommentList