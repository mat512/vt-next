export function getWeek(date: Date): number {
    const d = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export function getWeeksInYear(year: number): number {
    const month = 11;
    let day = 31;
    let week: number;
    do {
        const d = new Date(year, month, (day -= 1));
        week = getWeek(d);
    } while (week === 1);

    return week;
}

export function getYear(week: number): number {
    return new Date().getMonth() === 0 && week >= 52
        ? new Date().getFullYear() - 1
        : new Date().getFullYear();
}
