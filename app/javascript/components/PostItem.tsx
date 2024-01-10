import React from "react"
import { Card, CardContent, Typography, CardActions, Button } from "@mui/material"
import { postProps } from "../types/types"

function PostItem(props: postProps) {
    return <Card variant="outlined" sx={{border: 1, 
                                  margin: 1, 
                                  maxHeight: 200, 
                                  maxWidth:500, 
                                  textAlign: "center",
                                  boxShadow: 1}
                                  }>
                <CardContent sx={{paddingBottom: 1}}>
                    <Typography variant="h4">
                        {props.title}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" href={`/posts/${props.id}`}>Read Post</Button>
                </CardActions>
            </Card>
}

export default PostItem