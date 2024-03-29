export default function removeCookie(key: string) {
    const cDecoded = decodeURIComponent(document.cookie)
    const cookies = cDecoded.split("; ")

    cookies.forEach(element => {
        if(element.indexOf(`${key}=`) == 0){ // to remove movie, set cookie expiration to a past date
            document.cookie = `${element}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        }
    })
}