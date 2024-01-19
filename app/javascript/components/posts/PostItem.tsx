import React from "react"
import { Card, CardContent, Chip, Typography, CardActions, Button } from "@mui/material"
import { postProps } from "../../types/types"

function PostItem(props: postProps) {
    return <Card variant="outlined" sx={
                                      {border: 1, 
                                       margin: 1, 
                                       maxHeight: 200, 
                                       maxWidth:500, 
                                       textAlign: "center",
                                       boxShadow: 1
                                      }
                                    }
            >
        <CardContent sx={{paddingBottom: 1}}>
            <Typography noWrap variant="h4">
                {props.title} {/* displays post title*/}
            </Typography>
            <Typography fontSize={8}>
                {props.poster}
            </Typography>
            <Chip label={props.tag}/> {/* displays post tag*/}
        </CardContent>
        <CardActions>
            <Button size="small" href={`/posts/${props.id}`}>Read Post</Button> {/* displays button 
                                                                                    to direct to post thread*/}
        </CardActions>
    </Card>
}

export default PostItem