import { createTheme } from "@mui/material/styles"

declare module "@mui/material/styles/createPalette" {
    interface TypeBackground {
      default: string,
      paper: string
    }
}

const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#8a7f7f',
      },
      secondary: {
        main: 'rgba(170,170,23,0.93)',
      },
      background: {
        default: "#121212",
        paper: '#112081',
      },
      error: {
        main: '#bb2519',
      },
    },
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
})

export default theme