export default function getCookie(key: string) {
    const cDecoded = decodeURIComponent(document.cookie)
    const cookies = cDecoded.split("; ") // returns array of cookies
    let result: string | undefined = undefined

    cookies.forEach(element => {
        if(element.indexOf(`${key}=`) == 0){ // if cookie exists, return the substring that corresponds to the cookie value
            result = element.substring(key.length + 1)
        }
    })
    return result
}