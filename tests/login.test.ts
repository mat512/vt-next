import { test } from "@playwright/test";

import dotenv from "dotenv";

dotenv.config();

const code: string = process.env.CODE || "";

test.describe("login", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("should display an error message", async ({ page }) => {
        await page.locator('[placeholder="Code de groupe VT"]').fill("Test");
        await page.locator("text=Continuer").click();

        await page.locator("text=Désolé code invalide :/").click();
    });

    test("should login", async ({ page }) => {
        await page.locator('[placeholder="Code de groupe VT"]').fill(code);

        await page.locator("text=Continuer").click();

        await page.locator('img[alt="Emploi du temps"]').click();
    });
});
