import React, { useState, useContext } from "react"
import { QueryContext } from "../pages/MainPage"
import { Button, FormControlLabel, Checkbox, TextField, Box, Menu } from "@mui/material"
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
        <Box sx={
            { 
                paddingTop: 3,
                display: 'grid', 
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: 1,
                gridTemplateRows: 'auto',
                gridTemplateAreas: `"filter . search . sort"`
            }}>
            <Box sx={{gridArea: "filter"}}>
                <Button 
                    variant="outlined"  
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
            </Box>
            <Box sx={{gridArea: "search"}}>
                <TextField 
                    onChange={handleChange} 
                    placeholder="Search for posts"
                    size="small">
                </TextField>
            </Box>
            <Box sx={{gridArea: "sort"}}>
                <Button 
                    variant="outlined" 
                    onClick={() => console.log("not implemented sorry")}
                >
                    Sort posts
                </Button>
            </Box>
        </Box>
    )
}

export default FilterAndSort