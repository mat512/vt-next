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

export function getHistory(): string[] {
    let groupCodeHistory = localStorage.getItem("groupCodeHistory");

    let groupCodeHistoryList = [];

    if (groupCodeHistory !== null) {
        groupCodeHistoryList = groupCodeHistory.split(";");
    }

    return groupCodeHistoryList;
}

export function deleteHistory(): void {
    localStorage.setItem("groupCodeHistory", "");
}
