import React, { createContext, useState } from "react"
import NavBar from "../components/NavBar"
import PostList from "../components/posts/PostList"
import { Box } from "@mui/material"
import { allTagsObject } from "../types/types"

export const QueryContext = createContext({query: "", 
                                            setQuery: (_: string) => {} , 
                                            tagFilter: allTagsObject, 
                                            setTagFilter: (_: typeof allTagsObject) => {}
                                            }) /* sets query context. NavBar component receives and sets
                                                 the query via search field. PostList component containing the filter button
                                                 receives and sets tag filters via a checkbox menu.*/

function MainPage() {
    const QueryContextProvider = ({ children }) => {
        const [query, setQuery] = useState("");
        const [tagFilter, setTagFilter] = useState(allTagsObject)
        return (
            <QueryContext.Provider value={{ query, setQuery, tagFilter, setTagFilter }}>
                {children}
            </QueryContext.Provider>
        )
    }

    return <Box>
        <QueryContextProvider>
            <NavBar />
            <PostList />
        </QueryContextProvider>
    </Box>
}

export default MainPage