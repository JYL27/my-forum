import getCookie from "./getCookie"

export default function isLoggedIn() {
    return getCookie("user") // returns username if logged in, else return undefined
}