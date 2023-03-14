/**
 * Return the URL of original VT app.
 * @param param0 The HTTP request and the Workers environment variables
 * @returns The URL
 */
export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
    return new Response(env.VT_AGENDA_URL);
};
