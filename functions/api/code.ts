/**
 * Listen on request from a client.
 * @param param0 The HTTP request and the Workers environment variables
 * @returns The HTTP Response
 */
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
    const reqBody = await readRequestBody(request);

    if (reqBody === undefined) {
        return new Response("the Content-Type must be application/text");
    }

    const init = {
        body: `loginstudent=${reqBody}&larg=0&haut=0&cookieetudiant=0&logintype=student`,
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
    };

    const url = env.VT_AGENDA_URL + "/index.php";
    const response = await fetch(url, init);
    let results = await response.text();

    const regex = results.match(/name="current_student" value="(\d+)/i);
    if (regex === null) results = "no code found";
    else results = regex[1];

    return new Response(results);
};

/**
 * Return the request from a client and check if `contentType` is valid.
 * @param request The HTTP request
 * @returns The request in text
 */
async function readRequestBody(request) {
    const { headers } = request;
    const contentType = headers.get("content-type") || "";

    if (contentType.includes("application/text")) {
        return request.text();
    }
}
