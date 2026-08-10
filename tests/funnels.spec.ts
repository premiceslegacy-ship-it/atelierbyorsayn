import { expect, test } from "@playwright/test";
import { metiers } from "../src/data/metiers";

test("le CTA 14 jours révèle Pro/Expert et l'inscription conserve les UTM", async ({ page }) => {
  await page.goto("/?utm_source=google&utm_medium=cpc&utm_campaign=devis");
  await page.getByRole("button", { name: /Je démarre maintenant/ }).click();

  const trial = page.locator('a.pricing-card[href*="preferred=expert"]');
  await expect(trial).toHaveAttribute("href", /app\.atelier-btp\.fr\/login/);
  await trial.evaluate((element) => element.addEventListener("click", (event) => event.preventDefault(), { once: true }));
  await trial.click();

  const destination = new URL(await trial.getAttribute("href") ?? "");
  expect(destination.searchParams.get("mode")).toBe("signup");
  expect(destination.searchParams.get("intent")).toBe("trial");
  expect(destination.searchParams.get("preferred")).toBe("expert");
  expect(destination.searchParams.get("utm_source")).toBe("google");
  expect(destination.searchParams.get("utm_medium")).toBe("cpc");
  expect(destination.searchParams.get("utm_campaign")).toBe("devis");
});

for (const metier of metiers) {
  test(`les CTA WhatsApp gardent le contexte ${metier.metier}`, async ({ page, context }) => {
    await page.route("**/api/lead", (route) => route.fulfill({ status: 200, contentType: "application/json", body: "{}" }));
    await context.route("https://wa.me/**", (route) => route.fulfill({ status: 200, contentType: "text/html", body: "<title>WhatsApp test</title>" }));
    await page.goto(`/${metier.slug}`);

    await page.locator("#tarifs").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /On s'occupe de tout/ }).click();
    const setupDialog = page.getByRole("dialog");
    await expect(setupDialog).toBeVisible();
    await setupDialog.getByLabel("Prénom").fill("Test");
    await setupDialog.getByLabel("Téléphone").fill("06 12 34 56 78");
    const setupPopupPromise = page.waitForEvent("popup");
    await setupDialog.getByRole("button", { name: /Continuer sur WhatsApp/ }).click();
    const setupPopup = await setupPopupPromise;
    await setupPopup.waitForURL(/wa\.me\/33651664068/);
    const setupMessage = new URL(setupPopup.url()).searchParams.get("text") ?? "";
    expect(setupMessage.toLocaleLowerCase("fr")).toContain(metier.whatsapp.toLocaleLowerCase("fr"));
    await setupPopup.close();
    await setupDialog.getByRole("button", { name: "Fermer" }).click();
    await expect(setupDialog).not.toBeVisible();

    await page.getByRole("button", { name: /Voir Atelier en action/ }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await dialog.getByLabel("Prénom").fill("Test");
    await dialog.getByLabel("Téléphone").fill("06 12 34 56 78");

    const popupPromise = page.waitForEvent("popup");
    await dialog.getByRole("button", { name: /Continuer sur WhatsApp/ }).click();
    const popup = await popupPromise;
    await popup.waitForURL(/wa\.me\/33651664068/);

    const message = new URL(popup.url()).searchParams.get("text") ?? "";
    expect(message.toLocaleLowerCase("fr")).toContain(metier.whatsapp.toLocaleLowerCase("fr"));
    await popup.close();
  });
}
