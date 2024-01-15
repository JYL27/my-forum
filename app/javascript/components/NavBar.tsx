import React, { useContext, useState } from "react"
import { Button, Toolbar, AppBar, TextField, IconButton, Tooltip } from "@mui/material"
import PostAddIcon from "@mui/icons-material/PostAdd"
import SearchIcon from "@mui/icons-material/Search"
import { QueryContext } from "../pages/MainPage"


function NavBar() {
    const { setQuery } = useContext(QueryContext) // retrieves setQuery function via context provider
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setQuery(e.target.value)
    } // receives change in text field and sets query variable accordingly
    
    return (
      <AppBar position="static">
        <Toolbar variant="dense" sx={{height: 50, px: 5}}>
          <form>
            <TextField 
              onChange={handleChange}
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
            <IconButton size="large" href="/new">
              <PostAddIcon />
            </IconButton>
          </Tooltip>
          <Button variant="outlined" color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    )
}

export default NavBar
    