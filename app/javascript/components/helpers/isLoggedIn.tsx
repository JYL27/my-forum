import getCookie from "./getCookie"

export default function isLoggedIn() {
    return getCookie("user")
}