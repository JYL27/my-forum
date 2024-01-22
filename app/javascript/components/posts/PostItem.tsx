import React from "react"
import { Card, CardContent, Chip, Typography, CardActions, Button, Box } from "@mui/material"
import { postProps } from "../../types/types"

function PostItem(props: postProps) {
    return ( 
        <Card 
            variant="outlined" 
            sx={
                {
                    border: 1, 
                    margin: 1, 
                    height: 200, 
                    width: 500, 
                    textAlign: "center",
                    boxShadow: 1
                }
            }
        >
            <CardContent sx={{height: 3/4, paddingY: 2}}>
                <Typography 
                    noWrap
                    fontWeight={5}
                    fontSize={24}
                    paddingTop={2}
                >
                    {props.title} {/* displays post title*/}
                </Typography>
                <Typography 
                    noWrap
                    fontWeight={2}
                    fontSize={14}
                    paddingTop={1}
                >
                    {props.body} {/* displays post title*/}
                </Typography>
            </CardContent>
            <CardActions sx={
                {
                    height: 50,
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: 1,
                    gridTemplateRows: 'auto',
                    gridTemplateAreas: `"button . tag . poster"`
                }}>
                <Box sx={{gridArea: "button", width: 100}}>
                    <Button size="small" href={`/posts/${props.id}`}>Read Post</Button> {/* displays button 
                                                                                        to direct to post thread*/}
                </Box>
                <Box sx={{gridArea: "tag", width: 100}}>
                    <Chip size="small" label={props.tag}/> {/* displays post tag*/}
                </Box>
                <Box sx={{gridArea: "poster", width: 100}}>
                    <Typography noWrap fontSize={12}>
                        Posted by: {props.poster}
                    </Typography>
                </Box>                                                                            
            </CardActions>
        </Card>
    )
}

export default PostItem