/**
 * Add a code in the `localStorage`.
 * @param inputCode The input code
 */
export function addHistory(inputCode: string): void {
    let groupCodeHistory = localStorage.getItem("groupCodeHistory");

    if (groupCodeHistory === null) {
        localStorage.setItem("groupCodeHistory", inputCode);
        return;
    }

    if (groupCodeHistory.match(inputCode)) return;

    localStorage.setItem(
        "groupCodeHistory",
        groupCodeHistory + ";" + inputCode
    );
}

/**
 * Return the list of all saved code in the `localStorage`.
 * @returns The list of saved code 
 */
export function getHistory(): string[] {
    let groupCodeHistory = localStorage.getItem("groupCodeHistory");

    let groupCodeHistoryList = [];

    if (groupCodeHistory !== null) {
        groupCodeHistoryList = groupCodeHistory.split(";");
    }

    return groupCodeHistoryList;
}

/**
 * Remove all saved code from the `localStorage`.
 */
export function deleteHistory(): void {
    localStorage.removeItem("groupCodeHistory");
    localStorage.removeItem("groupCode");
    localStorage.removeItem("vtCode");
}
