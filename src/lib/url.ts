/**
 * Return the specific URL of the API
 * @param route The route of the request
 * @returns The API URL
 */
export function getAPIUrl(route: string): string {
    const currentUrl = window.location.href;

    let url: string;

    if (currentUrl.includes("localhost"))
        url = "https://dev.vt-evry.pages.dev/api/" + route;
    else url = currentUrl + "api/" + route;

    return url;
}
