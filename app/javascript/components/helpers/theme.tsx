import { createTheme } from "@mui/material/styles"

declare module "@mui/material/styles/createPalette" {
    interface TypeBackground {
      default: string,
      paper: string
    }
}

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#252323',
    },
    secondary: {
      main: 'rgba(245,245,7,0.93)',
    },
    background: {
      default: '#ffffff',
      paper: '#44a9f3',
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

const darkTheme = createTheme({
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
        paper: '#06124a',
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

export { lightTheme, darkTheme }