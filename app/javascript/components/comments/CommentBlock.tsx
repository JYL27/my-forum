import React, { useContext } from "react"
import { commentProps } from "../../types/types"
import { CommentContext } from "./CommentList"
import CommentItem from "./CommentItem"

function CommentBlock(props: commentProps) {
    const comments = useContext(CommentContext)
    console.log(props)
    function filterComments(comment: commentProps) {
        return comment.parent_id == props.id
    }

    const prevBlock = comments.filter(filterComments)
                                .map((comment) =>
                                        <CommentBlock {...comment} key={comment.id} />
                                    )

    return(
        <li key={props.id}>
            <CommentItem {...props}/>
            <ul>
                {prevBlock}
            </ul>
        </li>
    )
}

export default CommentBlock