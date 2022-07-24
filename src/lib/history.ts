export function addHistory(inputCode) {
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

export function getHistory() {
    let groupCodeHistory = localStorage.getItem("groupCodeHistory");

    let groupCodeHistoryList = [];

    if (groupCodeHistory !== null) {
        groupCodeHistoryList = groupCodeHistory.split(";");
    }

    return groupCodeHistoryList;
}

export function deleteHistory() {
    localStorage.setItem("groupCodeHistory", "");
}
