import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";

const screenshots = "artifacts/screenshots";
mkdirSync(screenshots, { recursive: true });

for (const viewport of [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "desktop", width: 1440, height: 1000 },
]) {
  test(`accueil ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Retrouvez 10h");
    await expect(page.locator("#demo")).toBeVisible();
    await page.screenshot({ path: `${screenshots}/accueil-${viewport.name}.png`, fullPage: true });
  });
}

test("navigation mobile, WhatsApp, démo et pricing", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/?utm_source=google&utm_medium=cpc&utm_campaign=devis");
  const menu = page.getByRole("button", { name: "Menu" });
  await menu.click();
  await expect(page.getByRole("link", { name: "Le journal" }).last()).toBeVisible();
  await expect(page.getByRole("button", { name: "Récupérer du temps" }).first()).toBeVisible();
  await page.locator("#demo").scrollIntoViewIfNeeded();
  await page.getByRole("tab", { name: /Vous validez/ }).click();
  await expect(page.getByText("Valider l'envoi")).toBeVisible();
  await page.locator("#tarifs").scrollIntoViewIfNeeded();
  await expect(page.locator("#tarifs")).toContainText(/3.000 €/);
  await page.getByRole("button", { name: /Je démarre maintenant/ }).click();
  const trialLinks = page.locator("a.pricing-card");
  await expect(trialLinks).toHaveCount(2);
  await expect(trialLinks.nth(0)).toBeVisible();
  await expect(trialLinks.nth(1)).toBeVisible();
  await expect(trialLinks.nth(0)).toHaveAttribute("href", /preferred=pro/);
  await expect(trialLinks.nth(1)).toHaveAttribute("href", /preferred=expert/);
  await expect(page.locator("#tarifs")).toContainText(/69 €/);
  await expect(page.locator("#tarifs")).toContainText(/169 €/);
  const preservedHref = await trialLinks.nth(0).evaluate((element) => {
    element.addEventListener("click", (event) => event.preventDefault(), { once: true });
    (element as HTMLAnchorElement).click();
    return (element as HTMLAnchorElement).href;
  });
  expect(preservedHref).toContain("utm_source=google");
  expect(preservedHref).toContain("utm_campaign=devis");
});

test("navigation clavier du carrousel et réduction des animations", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  await page.goto("/");
  const viewport = page.locator(".case-viewport");
  await viewport.focus();
  await expect(viewport).toBeFocused();
  const animation = await page.locator(".case-track").evaluate((element) => getComputedStyle(element).animationName);
  expect(animation).toBe("none");
  await page.getByRole("button", { name: "Cas client suivant" }).click();
  await context.close();
});

test("pages publiques clés", async ({ page }) => {
  for (const [route, heading] of [
    ["/electricien", "Devis envoyé"],
    ["/blog", "Des réponses de terrain"],
    ["/blog/calcul-marge-chantier-btp", "Marge chantier"],
  ]) {
    await page.goto(route);
    await expect(page.locator("h1")).toContainText(heading);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/blog");
  await page.screenshot({ path: `${screenshots}/blog-desktop.png`, fullPage: true });
  await page.goto("/electricien");
  await page.screenshot({ path: `${screenshots}/metier-desktop.png`, fullPage: true });
});
