import React, {createContext, useState} from "react"
import NavBar from "../components/NavBar"
import PostList from "../components/PostList"
import { Box } from "@mui/material"

// default for set functions
const def1: React.Dispatch<React.SetStateAction<string>> = (i) => i
const def2: React.Dispatch<React.SetStateAction<Array<string>>> = (i) => [i]

export const QueryContext = createContext({ query: "", setQuery: def1 , tagFilter: [""], setTagFilter: def2})

function MainPage() {
    const QueryContextProvider = ({ children }) => {
        const [query, setQuery] = useState("");
        const [tagFilter, setTagFilter] = useState([""])
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