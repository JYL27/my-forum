import React, { useContext } from "react"
import { Button, Card, CardContent, CardActions, Typography } from "@mui/material"
import { commentProps } from "../../types/types"
import getToken from "../getToken"
import { useNavigate } from "react-router-dom"
import { CommentContext } from "./CommentList"
import CommentItem from "./CommentItem"

function CommentBlock(props: commentProps) {
    const comments = useContext(CommentContext)

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