import React, { useState, createContext } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { CookiesProvider } from "react-cookie"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "@emotion/react"
import { lightTheme, darkTheme } from "./helpers/theme"
import { CssBaseline } from "@mui/material"

export const ThemeContext = createContext({isDarkTheme: false, setIsDarkTheme: (_: boolean) => {}})

function ThemeProviders ({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  return (
    <ThemeContext.Provider value={{isDarkTheme, setIsDarkTheme}}>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <CssBaseline />
          {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
} // constructs a component that provides the theme for the app

const queryClient = new QueryClient() // creates a query client object to make http requests 

document.addEventListener("turbo:load", () => {
  
  const root = createRoot(
    document.body.appendChild(document.createElement("div"))
  )

  root.render(
        <ThemeProviders>
          <QueryClientProvider client={queryClient}>
            <CookiesProvider>
              <App />
            </CookiesProvider>
          </QueryClientProvider>
        </ThemeProviders>
  )
})