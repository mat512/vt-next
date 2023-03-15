import { expect, test } from "@playwright/test";

import dotenv from "dotenv";

dotenv.config();

const code: string = process.env.CODE || "";

test.describe("header", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");

        await page.locator('[placeholder="Code de groupe VT"]').fill(code);
        await page.locator("text=Continuer").click();
    });

    test("should logout", async ({ page }) => {
        await page.getByRole("button", { name: "Déconnexion" }).click();

        await page.getByRole("heading", { name: "VT Next" }).click();
    });

    test("should change the theme", async ({ page }) => {
        let theme = await page
            .locator("body")
            .first()
            .getAttribute("data-theme");
        expect(theme).toBe("light");

        await page.getByRole("button", { name: "Changer de thème" }).click();

        theme = await page.locator("body").first().getAttribute("data-theme");
        expect(theme).toBe("dark");

        await page.getByRole("button", { name: "Déconnexion" }).click();

        theme = await page.locator("body").first().getAttribute("data-theme");
        expect(theme).toBe("dark");

        await page.reload();

        theme = await page.locator("body").first().getAttribute("data-theme");
        expect(theme).toBe("dark");
    });
});
