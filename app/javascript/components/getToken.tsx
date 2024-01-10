export default function getToken() {
    const tkn = document.querySelector('meta[name="csrf-token"]')
    if(tkn == null || !(tkn instanceof HTMLMetaElement)) {
        throw new ReferenceError("Token not found")
    } else  {
        return tkn.content
    }
}