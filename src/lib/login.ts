import { addHistory } from "./history";
import { groupCode, loggedIn, vtCode } from "../stores/login";
import { getAPIUrl } from "./url";

/**
 * Send a request to the API.
 * @param inputCode The input code
 * @param inputRemember The input remember
 * @returns If an error occurs
 */
export async function login(
    inputCode: string,
    inputRemember: boolean
): Promise<boolean> {
    // Exception for unit testing
    if (inputCode === "UNITTEST") {
        loggedIn.set(true);
        return false;
    }

    const value = await sendRequest(inputCode);

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

async function sendRequest(inputCode: string): Promise<string> {
    const url = getAPIUrl("code");
    const init = {
        method: "POST",
        headers: { "Content-Type": "application/text" },
        body: inputCode,
    };
    const response = await fetch(url, init);
    let results = await response.text();

    return results;
}
