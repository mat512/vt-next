/**
 * Return the week number of a specific date.
 * @param date The date
 * @returns The week number
 */
export function getWeek(date: Date): number {
    const d = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

/**
 * Return the number of weeks in a specfic year.
 * @param year The year
 * @returns The number of weeks
 */
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

/**
 * Return the year and check if a week is between two year.
 * @param week The week
 * @returns The year
 */
export function getYear(week: number): number {
    return new Date().getMonth() === 0 && week >= 52
        ? new Date().getFullYear() - 1
        : new Date().getFullYear();
}

/**
 * Go to the previous week.
 * @param week The week number
 * @param year The year
 * @returns The week number and the year
 */
export function previousWeek(week: number, year: number) {
    week -= 1;
    if (week <= 0) {
        year -= 1;
        week = getWeeksInYear(year);
    }

    return { week, year };
}

/**
 * Go to the next week.
 * @param week The week number
 * @param year The year
 * @returns The week number and the year
 */
export function nextWeek(week: number, year: number) {
    week += 1;
    if (week > getWeeksInYear(year)) {
        year += 1;
        week = 1;
    }

    return { week, year };
}

/**
 * Go to the today date.
 * @param week The week number
 * @param year The year
 * @returns The week number and the year
 */
export function today(week: number, year: number) {
    week = getWeek(new Date());
    year = getYear(week);

    return { week, year };
}
