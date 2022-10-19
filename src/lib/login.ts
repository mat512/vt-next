import { writable } from "svelte/store";

import { addHistory } from "./history";

export const loggedIn = writable(false);
export const vtCode = writable("");
export const groupCode = writable("");

/**
 * Send a request to the API
 * @param inputCode
 * @param inputRemember
 * @returns If an error occurs
 */
export async function login(
    inputCode: string,
    inputRemember: boolean
): Promise<boolean> {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/text" },
        body: inputCode,
    };

    const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/code",
        requestOptions
    );

    let value = await response.text();

    if (!value.includes("no code found")) {
        if (inputRemember) {
            localStorage.setItem("vtCode", value);
            localStorage.setItem("groupCode", inputCode);
            addHistory(inputCode);
        }

        loggedIn.set(true);
        vtCode.set(value);
        groupCode.set(inputCode);

        return false;
    } else {
        return true;
    }
}
