import { cors } from "./cors";

export async function onRequest({ request, env }) {
    let headers = new Headers();
    headers = cors(headers, request);

    return new Response(env.VT_AGENDA_URL, {
        headers: headers,
    });
}
