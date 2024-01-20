import React, { useState, useContext } from "react"
import { QueryContext } from "../pages/MainPage"
import { Button, FormControlLabel, Checkbox, TextField, Container, Stack, Menu } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { allTags } from "../types/types.tsx"

function FilterAndSort() {
    // retrieves context variables and setter functions via context provider
    const { setQuery, tagFilter, setTagFilter } = useContext(QueryContext) 
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null) // sets display for filter tag menu
    const open = Boolean(anchorEl)

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setQuery(e.target.value)
    } // receives change in text field and sets query variable accordingly

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(e.currentTarget) // anchor menu at the clicked target
    }

    function handleClose() {
        setAnchorEl(null)
    }

    function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
        setTagFilter({...tagFilter, [e.target.name]: e.target.checked}) 
    } // for each checkbox, reconstruct object and overwrite the target checkbox
    
    const allCheckboxes = allTags.map((tag) => // creates checkbox for all tags
                                          <span key={tag}>
                                            <FormControlLabel 
                                              control={
                                                <Checkbox
                                                  name={tag}
                                                  checked={tagFilter[tag]}
                                                  onChange={e => handleCheck(e)}
                                                />
                                              }
                                              label={tag}
                                              key={tag} />      
                                          </span>
                                        )
    return (
        <Container>
            <Stack direction="row">
                <Button 
                    className="filter-button"
                    variant="outlined" 
                    color="inherit" 
                    onClick={handleClick}
                >
                    Filter posts
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    {allCheckboxes}
                </Menu>
                <SearchIcon />
                <TextField 
                    onChange={handleChange}
                    id="search-field" 
                    variant="filled"
                    placeholder="Search for posts"
                    size="small">
                </TextField>
            </Stack>
        </Container>
    )
}

export default FilterAndSort