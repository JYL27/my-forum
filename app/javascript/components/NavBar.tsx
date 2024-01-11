import React, { useContext, useState } from "react"
import { Button, Toolbar, AppBar, TextField, IconButton, Tooltip, Menu, Checkbox, FormControlLabel } from "@mui/material"
import PostAddIcon from "@mui/icons-material/PostAdd"
import SearchIcon from "@mui/icons-material/Search"
import { QueryContext } from "../pages/MainPage"
import { allTags } from "../types/types"

// style
function NavBar() {
    const { setQuery, setTagFilter } = useContext(QueryContext)
    const [open, setOpen] = useState(false)

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setFunction) {
        setFunction(e.target.value)
    }

    function handleOpen() {
        setOpen(c => !c)
    }
    
    const allCheckboxes = allTags.map((tag) => <span key={tag}>
                                                <FormControlLabel 
                                                            control={
                                                            <Checkbox
                                                                onChange={e => handleChange(e, setTagFilter)}/>
                                                            }
                                                            label={tag}
                                                            key={tag}>
                                                </FormControlLabel>
                                                    
                                                </span>)

    return (
        <AppBar position="static">
            <Toolbar variant="dense" sx={{height: 50, px: 5}}>
                <form>
                    <TextField 
                            onChange={(e) => handleChange(e, setQuery)}
                            onClick={handleOpen}
                            id="search-field" 
                            variant="filled"
                            placeholder="Search for posts"
                            size="small">
                    </TextField>
                    <Menu
                        open={open}
                    >
                        {allCheckboxes}
                    </Menu>
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
    