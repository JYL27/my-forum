import React, { useContext } from "react"
import { Button, Card, CardContent, CardActions, Typography } from "@mui/material"
import { commentProps } from "../../types/types"
import getToken from "../getToken"
import { useNavigate } from "react-router-dom"
import { CommentContext } from "./CommentList"

function CommentBlock(props: {id: number}) {
    const comments = useContext(CommentContext)
}

export default CommentBlock