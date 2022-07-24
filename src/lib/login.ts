import { writable } from "svelte/store";

import { addHistory } from "./history";

export const isLoggedIn = writable(false);
export const vtCodeValue = writable("");
export const groupCodeValue = writable("");
export const errorCode = writable(false);

export async function login(inputCode, inputRemember) {
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

        isLoggedIn.set(true);
        vtCodeValue.set(value);
        groupCodeValue.set(inputCode);

        errorCode.set(false);
    } else {
        errorCode.set(true);
    }
}
