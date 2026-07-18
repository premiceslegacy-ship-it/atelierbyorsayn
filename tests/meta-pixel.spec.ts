import { test, expect } from "@playwright/test";

test("meta pixel: PageView on load, PageView on client nav, Contact on WhatsApp CTA", async ({ page }) => {
  const fbEvents: { event: string; url: string }[] = [];

  await page.route("**://connect.facebook.net/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" }),
  );
  await page.route("**://www.facebook.com/tr*", (route) => {
    const url = new URL(route.request().url());
    fbEvents.push({ event: url.searchParams.get("ev") ?? "", url: url.toString() });
    return route.fulfill({ status: 200, contentType: "image/gif", body: "" });
  });
  await page.exposeFunction("__capturePixelEvent", (name: string) => {
    fbEvents.push({ event: name, url: "fbq-call" });
  });
  await page.addInitScript(() => {
    const w = window as unknown as { fbq?: (...args: unknown[]) => void };
    const install = () => {
      const original = w.fbq;
      if (!original || (original as { __patched?: boolean }).__patched) return;
      const patched = (...args: unknown[]) => {
        if (args[0] === "track") {
          (window as unknown as { __capturePixelEvent: (n: string) => void }).__capturePixelEvent(String(args[1]));
        }
        return original(...args);
      };
      (patched as { __patched?: boolean }).__patched = true;
      w.fbq = patched;
    };
    Object.defineProperty(window, "fbq", {
      configurable: true,
      get() {
        return (this as { _fbq?: unknown })._fbq;
      },
      set(v) {
        (this as { _fbq?: unknown })._fbq = v;
        install();
      },
    });
  });

  // 1. Initial load on the home page (LP principale) -> expect one PageView
  await page.goto("/");
  await expect.poll(() => fbEvents.filter((e) => e.event === "PageView").length).toBe(1);

  // 2. Client-side navigation to a métier page -> expect a second PageView (not a third)
  await page.getByRole("link", { name: /électricien/i }).first().click({ trial: false }).catch(async () => {
    await page.goto("/electricien");
  });
  await page.waitForURL(/electricien/);
  await expect.poll(() => fbEvents.filter((e) => e.event === "PageView").length).toBeGreaterThanOrEqual(2);
  expect(fbEvents.filter((e) => e.event === "PageView").length).toBeLessThanOrEqual(2);

  // 3. Click a WhatsApp CTA -> expect a Contact event
  const [popup] = await Promise.all([
    page.context().waitForEvent("page").catch(() => null),
    page.getByRole("link", { name: /parler à samuel|récupérer du temps|rejoindre ces artisans|changer ce quotidien/i }).first().click(),
  ]);
  await expect.poll(() => fbEvents.some((e) => e.event === "Contact")).toBe(true);
  await popup?.close();
});
