import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("all page sections render with local assets and no runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const failed: string[] = [];
  page.on("response", (response) => {
    if (response.status() >= 400) failed.push(response.url());
  });
  await page.goto("/");
  await expect(page).toHaveTitle(/Selliro/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Great things deserve a second life.",
  );
  for (const section of [
    "why-selliro",
    "how-it-works",
    "discover",
    "trust",
    "faqs",
    "download",
  ]) {
    await expect(page.locator(`#${section}`)).toBeAttached();
  }
  const image = await page.request.get("/images/product-editorial.png");
  expect(image.ok()).toBeTruthy();
  expect(image.headers()["content-type"]).toContain("image/png");
  expect(errors).toEqual([]);
  expect(failed).toEqual([]);
});

test("buying and selling controls change the instructions and visual", async ({
  page,
}) => {
  await page.goto("/");
  const sellButton = page.getByRole("button", { name: "I’m selling" });
  await sellButton.click();
  await expect(sellButton).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByRole("heading", { name: "Create your listing." }),
  ).toBeVisible();
  await expect(page.getByText("Your listing looks good")).toBeVisible();
  await page.getByRole("button", { name: "I’m buying" }).click();
  await expect(
    page.getByRole("heading", { name: "Discover your next favourite." }),
  ).toBeVisible();
  await expect(sellButton).toHaveAttribute("aria-pressed", "false");
});

test("download buttons explain availability, trap focus, and return focus on Escape", async ({
  page,
}) => {
  await page.goto("/");
  for (const name of ["Download on the App Store", "GET IT ON Google Play"]) {
    const button = page.getByRole("button", { name }).first();
    await button.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(
      page.getByText(
        "Official App Store and Google Play download links will be available here soon. Check back to discover Selliro.",
      ),
    ).toBeVisible();
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() =>
        document.querySelector("dialog")?.contains(document.activeElement),
      ),
    ).toBeTruthy();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(button).toBeFocused();
  }
});

test("FAQs expand and collapse, and policy dialogs are honest placeholders", async ({
  page,
}) => {
  await page.goto("/");
  const question = page.getByRole("button", {
    name: "How does Make an Offer work?",
  });
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#faq-answer-2")).toBeVisible();
  await expect(page.locator("#faq-answer-0")).not.toBeVisible();
  await question.click();
  await expect(page.locator("#faq-answer-2")).not.toBeVisible();
  for (const title of [
    "Privacy Policy",
    "Terms & Conditions",
    "Return & Refund Policy",
  ]) {
    await page.getByRole("button", { name: title, exact: true }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(
      page.getByRole("dialog").getByRole("heading", { name: title }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Got it" }).click();
  }
});

test("mobile navigation opens, closes, and leads to the requested section", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const navigation = page.getByRole("navigation", {
    name: "Mobile navigation",
  });
  await expect(navigation).toBeVisible();
  await navigation.getByRole("link", { name: "How it works" }).click();
  await expect(navigation).not.toBeVisible();
  await expect(page).toHaveURL(/#how-it-works$/);
  await expect(page.locator("body")).not.toHaveClass("menu-is-open");
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const dimensions = await page.evaluate(() => ({
      content: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
    }));
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
}

test("reduced-motion presentation passes core accessibility checks", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});

test("marketing copy remains readable on small phones", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 850 });
  await page.goto("/");
  const sizes = await page
    .locator(
      ".hero-copy > p, .benefits p, .step p, .trust-intro > p, .faq-item p, .download-copy > p",
    )
    .evaluateAll((nodes) =>
      nodes.map((node) => parseFloat(getComputedStyle(node).fontSize)),
    );
  expect(Math.min(...sizes)).toBeGreaterThanOrEqual(16);
  await expect(
    page.getByText("LESS UNUSED. MORE POSSIBILITIES.", { exact: true }),
  ).toHaveCount(0);
});

test("motion respects reduced-motion preferences and pointer depth resets", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const headlineMotion = await page
    .locator(".hero-line > span")
    .first()
    .evaluate((node) => getComputedStyle(node).animationName);
  expect(headlineMotion).toBe("none");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const artwork = page.locator(".hero-art");
  await artwork.hover({ position: { x: 30, y: 30 } });
  await expect
    .poll(async () =>
      artwork.evaluate((node) => node.style.getPropertyValue("--pointer-x")),
    )
    .not.toBe("0px");
  await page.mouse.move(0, 0);
  await expect
    .poll(async () =>
      artwork.evaluate((node) => node.style.getPropertyValue("--pointer-x")),
    )
    .toBe("0px");
});
