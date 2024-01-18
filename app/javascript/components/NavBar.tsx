import React, { useContext, useState } from "react"
import { Button, Toolbar, AppBar, TextField, IconButton, Tooltip } from "@mui/material"
import PostAddIcon from "@mui/icons-material/PostAdd"
import SearchIcon from "@mui/icons-material/Search"
import { QueryContext } from "../pages/MainPage"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"

function NavBar() {
    const [cookies, removeCookies] = useCookies()
    const { setQuery } = useContext(QueryContext) // retrieves setQuery function via context provider
    const navigate = useNavigate()

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setQuery(e.target.value)
    } // receives change in text field and sets query variable accordingly

    function handleCreate() {
      navigate("/new", {state: {id: -1, title: " ", body: " ", tag: "General"}})
    }

    function handleLogout() {
      removeCookies("user", { path: "/", sameSite: "strict"})
      navigate("/")
    }

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
            <IconButton size="large" onClick={handleCreate}>
              <PostAddIcon />
            </IconButton>
          </Tooltip>
          <Button variant="outlined" color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    )
}

export default NavBar
    