// Return the VT code

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
    const { headers } = request;
    const contentType = headers.get("content-type") || "";

    if (contentType.includes("application/text")) {
        const requestBody = await request.text();

        const results = await sendRequest(env.VT_AGENDA_URL, requestBody);

        const response = findCode(results);

        return new Response(response);
    } else {
        return new Response("the Content-Type must be application/text");
    }
};

async function sendRequest(vtUrl: string, login: string): Promise<string> {
    const url = vtUrl + "/index.php";
    const init = {
        body: `loginstudent=${login}&larg=0&haut=0&cookieetudiant=0&logintype=student`,
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
    };
    const response = await fetch(url, init);
    let results = await response.text();

    return results;
}

function findCode(text: string): string {
    let value: string;

    const regex = text.match(/name="current_student" value="(\d+)/i);
    if (regex === null) value = "no code found";
    else value = regex[1];

    return value;
}
