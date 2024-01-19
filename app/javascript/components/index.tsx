import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { CookiesProvider } from "react-cookie"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

document.addEventListener("turbo:load", () => {

  const root = createRoot(
    document.body.appendChild(document.createElement("div"))
  )

  root.render(
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </QueryClientProvider>
  )
})