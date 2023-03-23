// Return the URL of original VT app

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
    return new Response(env.VT_AGENDA_URL);
};
