export const getUrlParams = () => {
    if(typeof window !== 'undefined')
        return new URLSearchParams(window.location.href.replace(/^.*\?/gm, "?"));
}