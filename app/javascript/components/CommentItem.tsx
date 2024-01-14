import React from "react"
import { Card, CardContent, Typography} from "@mui/material"
import { commentProps } from "../types/types"

function CommentItem(props: commentProps) {
    return <Card variant="outlined" sx={{border: 1, 
                                  margin: 1, 
                                  maxHeight: 200, 
                                  maxWidth:500, 
                                  textAlign: "center",
                                  boxShadow: 1}
                                  }>
                <CardContent>
                    <Typography fontSize={14}>
                        {props.commenter}
                    </Typography>
                    <Typography fontSize={12}>
                        {props.body}
                    </Typography>
                </CardContent>
            </Card>
}

export default CommentItem