import React from "react"
import { Toolbar, AppBar, IconButton, Tooltip, Typography, Stack, Box } from "@mui/material"
import PostAddIcon from "@mui/icons-material/PostAdd"
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from "react-router-dom"
import removeCookie from "./helpers/removeCookie"
import isLoggedIn from "./helpers/isLoggedIn"
import getCookie from "./helpers/getCookie"
import HomeIcon from '@mui/icons-material/Home'
import { defaultPost } from "../types/types"

function NavBar() {
  const navigate = useNavigate()
  const user = getCookie("user") // retrieves username via cookie

  function handleCreate() {
    navigate("/new", {state: defaultPost})
  } // if user chooses to create a new post, navigate to new post page with a default location state

  function handleLogin() {
    navigate("/login")
  } // if user chooses to login, navigate to login page

  function handleLogout() {
    removeCookie("user")
    navigate("/")
  } /* if user chooses to logout, remove the cookie containing the user's username 
      and redirect to root page (in this case, login page) */

  function handleGoHome() {
    navigate("/posts")
  } // users may choose go back to the main posts page

  return (
    <AppBar position="static">
      <Toolbar 
        sx={
          {
            height: 50, 
            px: 5,
            display: 'grid', 
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 1,
            gridTemplateRows: 'auto',
            gridTemplateAreas: `". . username . buttons"`
          }}
          variant="dense" 
      >
        <Box sx={{gridArea: "username"}}>
          <Typography variant="h6">
            Logged in as: {user}
          </Typography>
        </Box> {/* displays the user's current username */}
        
        <Stack 
          direction="row"
          sx={
            {
              gridArea: "buttons",
              justifyContent: "flex-end"
            }}
        >
          <Tooltip title="Go back to Posts" placement="bottom">
            <IconButton size="large" onClick={handleGoHome}>
              <HomeIcon />
            </IconButton>
          </Tooltip>
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
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar