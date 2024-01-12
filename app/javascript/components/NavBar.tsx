import React, { useContext, useState } from "react"
import { Button, Toolbar, AppBar, TextField, IconButton, Tooltip } from "@mui/material"
import PostAddIcon from "@mui/icons-material/PostAdd"
import SearchIcon from "@mui/icons-material/Search"
import { QueryContext } from "../pages/MainPage"


function NavBar() {
    const { setQuery } = useContext(QueryContext)

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setFunction) {
        setFunction(e.target.value)
    }
    
    return (
        <AppBar position="static">
            <Toolbar variant="dense" sx={{height: 50, px: 5}}>
                <form>
                    <TextField 
                            onChange={(e) => handleChange(e, setQuery)}
                            id="search-field" 
                            variant="filled"
                            placeholder="Search for posts"
                            size="small">
                    </TextField>
                    <Tooltip title="Search" placement="bottom">
                        <IconButton type="submit" size="large">
                            <SearchIcon />
                        </IconButton>
                    </Tooltip>
                </form>
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
    