import { expect, test } from "@playwright/test";

const HERO_HEADING = /Modern product rituals/i;
const HERO_SUBTITLE = /Next Bite helps modern teams plan, ship, and learn/i;
const LOGIN_URL = /\/en\/login$/;

const HOME_PATH = "/en";

test.describe("Home Page", () => {
  test("UI matches design specifications", async ({ page }) => {
    await page.goto(HOME_PATH);

    const link = page.getByRole("link", { name: "Get Started" });
    await expect(link).toHaveAttribute("href", "/en/login");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: HERO_HEADING,
      })
    ).toBeVisible();
    await expect(page.getByText(HERO_SUBTITLE)).toBeVisible();

    const features = [
      "Signal routing",
      "Live playbooks",
      "Compliance ready",
      "Customer pulse",
    ];

    for (const feature of features) {
      await expect(
        page.getByRole("heading", { level: 3, name: feature })
      ).toBeVisible();
    }

    await expect(page.getByLabel("First name")).toHaveAttribute(
      "placeholder",
      "Avery"
    );
    await expect(page.getByLabel("Last name")).toHaveAttribute(
      "placeholder",
      "Stone"
    );
    await expect(page.getByLabel("Work email")).toHaveAttribute(
      "placeholder",
      "you@studio.com"
    );
    await expect(page.getByLabel("What are you building?")).toHaveAttribute(
      "placeholder",
      "Share goals, timeline, and team size."
    );
    await expect(
      page.getByRole("button", { name: "Send message" })
    ).toBeVisible();

    await expect(page.getByText("hello@biteui.co")).toBeVisible();
    await expect(page.getByText("partners@biteui.co")).toBeVisible();
    await expect(page.getByText("support@biteui.co")).toBeVisible();
    await expect(
      page.getByText("Build calmer launches with Next Bite.")
    ).toBeVisible();
  });

  test("when user clicks Get Started, navigates to login", async ({ page }) => {
    await page.goto(HOME_PATH);

    await page.getByRole("link", { name: "Get Started" }).click();

    await expect(page).toHaveURL(LOGIN_URL);
  });
});
