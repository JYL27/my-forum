import React, { createContext, useState } from "react"
import NavBar from "../components/NavBar"
import PostList from "../components/posts/PostList"
import FilterAndSort from "../components/FilterAndSort"
import { Box } from "@mui/material"
import { allTagsObject } from "../types/types"

export const QueryContext = createContext({query: "", 
                                            setQuery: (_: string) => {} , 
                                            tagFilter: allTagsObject, 
                                            setTagFilter: (_: typeof allTagsObject) => {}
                                            }) // exports query context to FilterAndSort and PostList.
function MainPage() {
    /* instantiates context which is then shared to FilterAndSort, 
        which updates the query and tag respectively */
    const QueryContextProvider = ({ children }) => {
        const [query, setQuery] = useState("");
        const [tagFilter, setTagFilter] = useState(allTagsObject)
        return (
            <QueryContext.Provider value={{ query, setQuery, tagFilter, setTagFilter }}>
                {children}
            </QueryContext.Provider>
        )
    }

    return (
        <Box sx={
            {   
                width: 1,
                height: 1,
                textAlign: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column"
            }}>
            <QueryContextProvider>
                <NavBar />
                <FilterAndSort />
                <PostList />
            </QueryContextProvider>
        </Box>
    )
}

export default MainPage