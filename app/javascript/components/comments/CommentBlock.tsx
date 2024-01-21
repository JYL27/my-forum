import React, { useContext } from "react"
import { commentProps } from "../../types/types"
import { CommentContext } from "./CommentList"
import CommentItem from "./CommentItem"

function CommentBlock(props: commentProps) {
    const comments = useContext(CommentContext)

    function filterComments(comment: commentProps) {
        return comment.parent_id == props.id
    } // filter all comments that are not replies to the current root comment
    
    // recursively renders a comment block for each reply to the current root comment
    const prevBlock = comments.filter(filterComments)
                                .map((comment) =>
                                        <CommentBlock {...comment} key={comment.id} />
                                    ) 

    return(
        <li key={props.id}>
            <CommentItem {...props}/>
            <ul style={{ listStyleType: "none" }}>
                {prevBlock}
            </ul>
        </li>
    )
}

export default CommentBlock