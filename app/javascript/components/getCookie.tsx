export default function getCookie(key: string) {
    const cDecoded = decodeURIComponent(document.cookie)
    const cookies = cDecoded.split("; ")
    let result: string = " "

    cookies.forEach(element => {
        if(element.indexOf(`${key}=`) == 0){
            result = element.substring(key.length + 1)
        }
    })
    
    return result
}