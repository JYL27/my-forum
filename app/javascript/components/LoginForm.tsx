import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Typography, TextField, Container } from "@mui/material"
import { useCookies } from "react-cookie"

function LoginForm() {

    const navigate = useNavigate()
    // instantiates cookies, username, and username error for the text field, and setters for them
    const [cookies, setCookies] = useCookies(["user"])
    const [username, setUsername] = useState("")
    const [usernameError, setUsernameError] = useState(false)

    // if user chooses not to login, navigate to main page 
    function handleNoLogin() {
        navigate("/posts")
    }

    function handleLogin(user: string | object) {
        setCookies("user", user, { path: "/", sameSite: "strict"})
        navigate("/posts") /* on login, cookie containing username is saved. 
                            Username is retrieved via the cookies throughout the app. 
                            User is then redirected to the main page. 
                            Cookie is stored until logout or until the cookie expires. */
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setUsername(e.target.value) // sets username state variable upon the user keying in their username 
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault() // prevents the page from refreshing
        setUsernameError(false) /* upon every submission, username error is set to 
                                    the default false value before checking for error */

        if(username.length == 0) {
            setUsernameError(true) /* if user does not key in a username, 
                                        sets username error to true and prevents submission */
            return
        }

        handleLogin(username) /* if user has keyed in a username, call handleLogin function,
                                which sets the cookie and redirects the user to the main page */
    }

    return <Container>
        <Typography className="form-header-text">
            Login!
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField 
                className="text-field-reg"
                onChange={handleChange}
                label="Username"
                value={username}
                required
                error={usernameError}>
            </TextField>
            <Button className="button"
                    type="submit" 
            >
                Login
            </Button>
            <Button 
                className="button" 
                onClick={handleNoLogin}
            >
                View posts without logging in
            </Button> {/* users may choose not to log in, after which 
                            they may view posts but not create or comment on them */}
        </form>
    </Container>
}


export default LoginForm