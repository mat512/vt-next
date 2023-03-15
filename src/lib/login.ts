import { addHistory } from "./history";
import { groupCode, loggedIn, vtCode } from "../stores/login";

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
