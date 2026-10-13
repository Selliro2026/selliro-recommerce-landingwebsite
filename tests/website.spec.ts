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
    /Buy\.\s*Sell\.\s*Repeat\./,
  );
  for (const section of [
    "why-selliro",
    "how-it-works",
    "trust",
    "faqs",
    "download",
  ]) {
    await expect(page.locator(`#${section}`)).toBeAttached();
  }
  const image = await page.request.get("/images/app-home.webp");
  expect(image.ok()).toBeTruthy();
  expect(image.headers()["content-type"]).toContain("image/webp");
  await expect(page.locator(".hero-stage")).toBeVisible();
  await expect(
    page.locator(".hero-stage").getByRole("img", {
      name: "Selliro app home screen with the redesigned Buy. Sell. Repeat. banner",
    }),
  ).toBeVisible();
  await page.waitForLoadState("networkidle");
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
    page.getByRole("heading", { name: /Create your listing\./ }),
  ).toBeVisible();
  await expect(page.getByText("Your listing looks good")).toBeVisible();
  await page.getByRole("button", { name: "I’m buying" }).click();
  await expect(
    page.getByRole("heading", { name: /Discover your next favourite\./ }),
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
        document
          .querySelector("dialog[open]")
          ?.contains(document.activeElement),
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

for (const width of [320, 390, 1440]) {
  test(`marketing copy and actions remain readable at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 850 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const textSizes = await page
      .locator(
        [
          ".hero-copy > p",
          ".desktop-nav > a",
          ".nav-download",
          ".text-link",
          ".section-marker > span",
          ".eyebrow",
          ".benefits h3",
          ".benefits p",
          ".why-story > p",
          ".app-promises > span",
          ".mode-switch button",
          ".step h3 button",
          ".step p",
          ".journey-topline > span",
          ".journey-label",
          ".journey-card-link",
          ".journey-bottomline > span",
          ".assurance-copy h3",
          ".assurance-copy p",
          ".trust-note",
          ".rewards-copy p",
          ".faq-intro p",
          ".faq-item h3 button",
          ".faq-item p",
          ".download-copy > p",
          ".footer-top p",
          ".footer-bottom nav a",
          ".footer-bottom nav button",
        ].join(", "),
      )
      .evaluateAll((nodes) =>
        nodes
          .filter((node) => {
            const style = getComputedStyle(node);
            return (
              node.getClientRects().length > 0 &&
              style.visibility !== "hidden" &&
              !node.closest('[aria-hidden="true"], [inert], .app-device')
            );
          })
          .map((node) => ({
            text: node.textContent?.trim(),
            selector: `${node.tagName.toLowerCase()}.${node.className}`,
            size: parseFloat(getComputedStyle(node).fontSize),
          })),
      );
    expect(textSizes.length).toBeGreaterThan(30);
    expect(textSizes.filter(({ size }) => size < 16)).toEqual([]);
    await expect(
      page.getByText("LESS UNUSED. MORE POSSIBILITIES.", { exact: true }),
    ).toHaveCount(0);
  });
}

test("motion respects preferences, including changes after page load", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const headlineMotion = await page
    .locator(".hero-line > span")
    .first()
    .evaluate((node) => getComputedStyle(node).animationName);
  expect(headlineMotion).toBe("none");
  const headline = page.locator(".hero-line > span").first();
  await expect(headline).toHaveCSS("transform", "none");
  await expect(page.locator(".hero-stage")).toHaveCSS("opacity", "1");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect
    .poll(() => headline.evaluate((node) => getComputedStyle(node).transform))
    .not.toBe("none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(headline).toHaveCSS("transform", "none");
  await expect(page.locator(".hero-stage")).toHaveCSS("opacity", "1");
});

test("the supplied app screen loads without distortion and fits phone layouts", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const phone = page.locator(".hero-stage .app-device");
    const screen = phone.getByRole("img", {
      name: "Selliro app home screen with the redesigned Buy. Sell. Repeat. banner",
    });
    await expect(phone).toBeVisible();
    await expect(screen).toBeVisible();
    await expect(screen).toHaveAttribute("src", "/images/app-home.webp");
    await expect
      .poll(() =>
        screen.evaluate(
          (node: HTMLImageElement) =>
            node.complete && node.naturalWidth > 0 && node.naturalHeight > 0,
        ),
      )
      .toBeTruthy();
    const dimensions = await screen.evaluate((node: HTMLImageElement) => {
      const image = node.getBoundingClientRect();
      const phone = node.closest(".app-device")!.getBoundingClientRect();
      const screen = node.closest(".device-screen")!;
      const viewport = screen.getBoundingClientRect();
      const clipping = getComputedStyle(screen);
      return {
        naturalRatio: node.naturalWidth / node.naturalHeight,
        displayedRatio: image.width / image.height,
        imageWidth: image.width,
        imageLeft: image.left,
        imageRight: image.right,
        screenLeft: viewport.left,
        screenRight: viewport.right,
        screenTop: viewport.top,
        screenBottom: viewport.bottom,
        overflowX: clipping.overflowX,
        overflowY: clipping.overflowY,
        phoneLeft: phone.left,
        phoneRight: phone.right,
        phoneTop: phone.top,
        phoneBottom: phone.bottom,
        viewportWidth: window.innerWidth,
      };
    });
    expect(dimensions.naturalRatio).toBeLessThan(0.6);
    expect(dimensions.imageWidth).toBeGreaterThan(200);
    expect(dimensions.phoneLeft).toBeGreaterThanOrEqual(0);
    expect(dimensions.phoneRight).toBeLessThanOrEqual(dimensions.viewportWidth);
    expect(dimensions.screenLeft).toBeGreaterThanOrEqual(dimensions.phoneLeft);
    expect(dimensions.screenRight).toBeLessThanOrEqual(dimensions.phoneRight);
    expect(dimensions.screenTop).toBeGreaterThanOrEqual(dimensions.phoneTop);
    expect(dimensions.screenBottom).toBeLessThanOrEqual(dimensions.phoneBottom);
    expect(dimensions.overflowX).toBe("hidden");
    expect(dimensions.overflowY).toBe("hidden");
    // The image extends behind the clipped viewport to mask source-image gutters.
    expect(dimensions.imageLeft).toBeLessThanOrEqual(dimensions.screenLeft);
    expect(dimensions.imageRight).toBeGreaterThanOrEqual(
      dimensions.screenRight,
    );
    expect(
      Math.abs(dimensions.displayedRatio - dimensions.naturalRatio),
    ).toBeLessThan(0.01);
    await expect(page.locator("canvas")).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: /Rotate products|Reset view/ }),
    ).toHaveCount(0);
  }
});

test("delivery and the 3-day return window are explained with accessible details", async ({
  page,
}) => {
  await page.goto("/");
  const trust = page.locator("#trust");
  await trust.scrollIntoViewIfNeeded();
  await expect(trust).toContainText(/secure delivery/i);
  await expect(trust).toContainText(/3.day return window/i);
  const deliveryQuestion = page.getByRole("button", {
    name: "How does secure delivery work?",
  });
  await deliveryQuestion.click();
  await expect(deliveryQuestion).toHaveAttribute("aria-expanded", "true");
  const deliveryAnswerId = await deliveryQuestion.getAttribute("aria-controls");
  expect(deliveryAnswerId).toBeTruthy();
  const deliveryAnswer = page.locator(`#${deliveryAnswerId}`);
  await expect(deliveryAnswer).toBeVisible();
  await expect(deliveryAnswer).toContainText(/delivery/i);
  await expect(deliveryAnswer).toContainText(/location|availability/i);
  const question = page.getByRole("button", {
    name: "How does the 3-day return window work?",
  });
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(deliveryQuestion).toHaveAttribute("aria-expanded", "false");
  await expect(deliveryAnswer).not.toBeVisible();
  const answerId = await question.getAttribute("aria-controls");
  expect(answerId).toBeTruthy();
  const answer = page.locator(`#${answerId}`);
  await expect(answer).toBeVisible();
  await expect(answer).toContainText(/3.day/i);
  await expect(answer).toContainText(/eligib|terms|policy/i);
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "false");
  await expect(answer).not.toBeVisible();
});

test("app navigation and the hero explain how to use Selliro", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "The app", exact: true })
    .click();
  await expect(page).toHaveURL(/#why-selliro$/);
  await page.locator(".hero-explore").click();
  await expect(page).toHaveURL(/#how-it-works$/);
  await expect(page.getByRole("button", { name: "I’m buying" })).toBeVisible();
  await expect(page.getByRole("button", { name: "I’m selling" })).toBeVisible();
});

test("each journey step updates its explanation and product story", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: /02 Make an offer/ }).click();
  await expect(page.locator("#step-description-1")).toBeVisible();
  await expect(page.locator("#step-description-0")).not.toBeVisible();
  await expect(
    page.getByText("Your find. Your offer.", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "I’m selling" }).click();
  await expect(page.locator("#step-description-0")).toBeVisible();
  await page.getByRole("button", { name: /03 Pass it on/ }).click();
  await expect(
    page.getByText("Arrange your handover", { exact: true }),
  ).toBeVisible();
});

test("mobile menu contains keyboard focus, closes on Escape and handles resizing", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const open = page.getByRole("button", { name: "Open menu" });
  await open.click();
  await page.keyboard.press("Shift+Tab");
  expect(
    await page.evaluate(() =>
      document.querySelector(".menu-dialog")?.contains(document.activeElement),
    ),
  ).toBeTruthy();
  await page.keyboard.press("Escape");
  await expect(open).toBeFocused();
  await expect(page.locator("body")).not.toHaveClass("menu-is-open");
  await open.click();
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(page.locator(".menu-dialog")).not.toBeVisible();
  await expect(page.locator("body")).not.toHaveClass("menu-is-open");
});

test("mobile download control appears after the hero and clears at the final CTA", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const dock = page.locator(".mobile-dock");
  await expect(dock).not.toBeVisible();
  await page.locator("#how-it-works").scrollIntoViewIfNeeded();
  await expect(dock).toBeVisible();
  await dock.getByRole("button", { name: "Get Selliro" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await page.locator("#download").scrollIntoViewIfNeeded();
  await expect(dock).not.toBeVisible();
});
