import React from "react"
import { Button, Toolbar, AppBar, TextField, IconButton } from "@mui/material"
// import PostAddIcon from '@mui/icons-material/PostAdd';
// style
function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar sx={{height: 50}}>
                <TextField id="search-field" 
                           variant="filled"
                           placeholder="Search for posts"
                           size="small">
                </TextField>
                <IconButton aria-label="Create New Post" size="large" href="/post"></IconButton>
                <Button variant="outlined" color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
    