export function cors(headers, request) {
    headers.set("Access-Control-Allow-Origin", request.headers.get("Origin"));

    if (request.method === "OPTIONS") {
        headers.set(
            "Access-Control-Allow-Methods",
            request.headers.get("access-control-request-method")
        );

        const acrh = request.headers.get("access-control-request-headers");
        if (acrh) {
            headers.set("Access-Control-Allow-Headers", acrh);
        }

        headers.delete("X-Content-Type-Options");
    }

    return headers;
}
