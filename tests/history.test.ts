import { expect, test } from "@playwright/test";

import dotenv from "dotenv";

dotenv.config();

const code: string = process.env.CODE || "";

test.describe("history", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("should be empty by default", async ({ page }) => {
        const combobox = await page.getByRole("combobox").allInnerTexts();
        expect(combobox).toStrictEqual([""]);
    });

    test("should not be stored in the history when the remember box is unchecked", async ({
        page,
    }) => {
        await page.locator('[placeholder="Code de groupe VT"]').fill(code);
        await page.getByLabel("Se souvenir").uncheck();
        await page.locator("text=Continuer").click();

        await page.getByRole("button", { name: "Déconnexion" }).click();

        const combobox = await page.getByRole("combobox").allInnerTexts();
        expect(combobox).toStrictEqual([""]);
    });

    test("should be stored in the history", async ({ page }) => {
        await page.locator('[placeholder="Code de groupe VT"]').fill(code);
        await page.locator("text=Continuer").click();

        await expect(page.locator("p")).toContainText(`Code: ${code}`);

        await page.reload();

        await page.getByRole("button", { name: "Déconnexion" }).click();

        const combobox = await page.getByRole("combobox").allInnerTexts();
        expect(combobox).toStrictEqual([code]);
    });

    test("should remove the history", async ({ page }) => {
        await page.locator('[placeholder="Code de groupe VT"]').fill(code);
        await page.locator("text=Continuer").click();

        await page.getByRole("button", { name: "Déconnexion" }).click();

        await page
            .getByRole("button", { name: "Supprimer l'historique" })
            .click();

        const combobox = await page.getByRole("combobox").allInnerTexts();
        expect(combobox.length).toBe(0);
    });
});
