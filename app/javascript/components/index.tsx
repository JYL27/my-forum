import React, { useState, createContext } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { CookiesProvider } from "react-cookie"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "@emotion/react"
import { lightTheme, darkTheme } from "./helpers/theme"
import { CssBaseline } from "@mui/material"

export const ThemeContext = createContext((_: boolean) => {})
const queryClient = new QueryClient()

document.addEventListener("turbo:load", () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const root = createRoot(
    document.body.appendChild(document.createElement("div"))
  )

  root.render(
    <ThemeContext.Provider value={setIsDarkTheme}>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <CookiesProvider>
            <App />
          </CookiesProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
})