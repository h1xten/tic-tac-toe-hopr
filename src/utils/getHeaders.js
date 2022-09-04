import { Buffer } from "buffer"

export const getHeaders = (token, isPost = false) => {
        const headers = new Headers()
        if (isPost) {
        headers.set('Content-Type', 'application/json')
        headers.set('Accept-Content', 'application/json')
        }
        headers.set('Authorization', 'Basic ' + Buffer.from(token).toString('base64'))
    return headers
}