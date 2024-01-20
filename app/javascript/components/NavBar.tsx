import React from "react"
import { Toolbar, AppBar, IconButton, Tooltip, Typography } from "@mui/material"
import PostAddIcon from "@mui/icons-material/PostAdd"
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from "react-router-dom"
import removeCookie from "./helpers/removeCookie"
import isLoggedIn from "./helpers/isLoggedIn"
import getCookie from "./helpers/getCookie"

function NavBar() {
    
  const navigate = useNavigate()
  const user = getCookie("user") // retrieves username via cookie

  function handleCreate() {
    navigate("/new", {state: {id: -1, title: " ", body: " ", tag: "General"}})
  } // if user chooses to create a new post, navigate to new post page with a default location state

  function handleLogin() {
    navigate("/login")
  } // if user chooses to login, navigate to login page

  function handleLogout() {
    removeCookie("user")
    navigate("/")
  } /* if user chooses to logout, remove the cookie containing the user's username 
      and redirect to root page (in this case, login page) */

  return (
    <AppBar position="static">
      <Toolbar variant="dense" sx={{height: 50, px: 5}}>
        <Typography className="nav-bar-text">
          Logged in as: {user}
        </Typography>
        <Tooltip title="Create New Post" placement="bottom">
          <IconButton size="large" onClick={handleCreate}>
            <PostAddIcon />
          </IconButton>
        </Tooltip>
        {isLoggedIn() ? <Tooltip title="Logout" placement="bottom">
                          <IconButton size="large" onClick={handleLogout}>
                            <LogoutIcon />
                          </IconButton>
                        </Tooltip>
                      : <Tooltip title="Login" placement="bottom">
                          <IconButton size="large" onClick={handleLogin}>
                            <LoginIcon />
                          </IconButton>
                        </Tooltip>} {/* checks if user is logged in and renders the corresponding icon button */}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar