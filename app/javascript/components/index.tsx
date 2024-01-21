import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { CookiesProvider } from "react-cookie"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "@emotion/react"
import theme from "./helpers/theme"
import { CssBaseline } from "@mui/material"

const queryClient = new QueryClient()

document.addEventListener("turbo:load", () => {

  const root = createRoot(
    document.body.appendChild(document.createElement("div"))
  )

  root.render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </QueryClientProvider>
    </ThemeProvider>
    
  )
})