import { cors } from "./cors";

/**
 * Return the URL of original VT app.
 * @param param0 The HTTP request and the Workers environment variables
 * @returns The URL
 */
export async function onRequest({ request, env }) {
    let headers = new Headers();
    headers = cors(headers, request);

    return new Response(env.VT_AGENDA_URL, {
        headers: headers,
    });
}
