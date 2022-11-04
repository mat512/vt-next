import { expect, test } from "@playwright/test";

test.describe("navigation", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:3000/");

        await page
            .locator('[placeholder="Code de groupe VT"]')
            .fill("UnitTest");
        await page.locator("text=Continuer").click();
    });

    const week = getWeek(new Date());
    const year = new Date().getFullYear();

    test("should go to next week", async ({ page }) => {
        await page.getByRole("button", { name: "Suivante" }).click();
        await expect(page.locator("p")).toContainText(
            `Semaine: ${week + 1} - Année: ${year}`
        );
    });

    test("should go to previous week", async ({ page }) => {
        await page.getByRole("button", { name: "Précédente" }).click();
        await expect(page.locator("p")).toContainText(
            `Semaine: ${week - 1} - Année: ${year}`
        );
    });

    test("should go to current week", async ({ page }) => {
        await page.getByRole("button", { name: "Précédente" }).click();

        await page.getByRole("button", { name: "Aujourd'hui" }).click();
        await expect(page.locator("p")).toContainText(
            `Semaine: ${week} - Année: ${year}`
        );
    });

    test("should go to a specific week with user field", async ({ page }) => {
        await page.getByPlaceholder("Semaine").fill("5");
        await expect(page.locator("p")).toContainText(
            `Semaine: 5 - Année: ${year}`
        );
    });

    test("should go to a specfic week with user calendar field", async ({
        page,
    }) => {
        await page.getByPlaceholder("Calendrier").fill("2022-11-17");
        await expect(page.locator("p")).toContainText(
            `Semaine: 46 - Année: 2022`
        );
    });
});

function getWeek(date: Date): number {
    const d = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}
