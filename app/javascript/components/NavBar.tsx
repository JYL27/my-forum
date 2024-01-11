import React from "react"
import { Button, Toolbar, AppBar, TextField, IconButton, Tooltip, Icon } from "@mui/material"
import PostAddIcon from "@mui/icons-material/PostAdd";
import SearchIcon from "@mui/icons-material/Search"

// style
function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar variant="dense" sx={{height: 50, px: 5}}>
                <TextField id="search-field" 
                           variant="filled"
                           placeholder="Search for posts"
                           size="small">
                </TextField>
                <Tooltip title="Search" placement="bottom">
                    <IconButton type="submit" size="large">
                        <SearchIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Create New Post" placement="bottom">
                    <IconButton size="large" href="/new-post">
                        <PostAddIcon />
                    </IconButton>
                </Tooltip>
                <Button variant="outlined" color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
    