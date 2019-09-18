export const getWebAppHost = (): string => location.protocol === "file:" ? DEFAULT_HOST : location.host

export const getWebSocketURI = (): string => `ws://${getWebAppHost()}/sub`

export const resolveResource = (path: string): string => {
    if (location.protocol === "file:") {
        return `http://${DEFAULT_HOST}/resources/${path}`
    } else {
        return `/resources/${path}`
    }
}
