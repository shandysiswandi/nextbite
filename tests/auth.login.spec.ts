import { expect, test } from "@playwright/test";

const LOGIN_BUTTON_LABEL = "Login";
const NON_EMPTY_TEXT = /.+/;
const ERROR_EMAIL_TEXT = "Please enter a valid email address";
const ERROR_PASSWORD_TEXT = "Please enter your password";
const DASHBOARD_URL = /\/en\/console\/dashboard/;
const TWO_FACTOR_APP_URL = /\/en\/two-factor\/app/;
const CONSOLE_ME_PATH = "/en/console/me";
const CONSOLE_ME_URL = new RegExp(`${CONSOLE_ME_PATH}$`);
const LOGIN_WITH_FROM = new RegExp(
  `/en/login\\?from=${encodeURIComponent(CONSOLE_ME_PATH)}`
);

const LOGIN_PATH = "/en/login";
const USER = {
  email: "admin@gobite.com",
  password: "Secret123!",
} as const;
const MFA_USER = {
  email: "user@gobite.com",
  password: "Secret123!",
} as const;

test.describe("Auth Login", () => {
  test("UI matches design specifications", async ({ page }) => {
    await page.goto(LOGIN_PATH);

    await expect(
      page.getByRole("heading", { level: 1, name: "Welcome Back" })
    ).toBeVisible();
    await expect(
      page.getByText(
        "Please sign in and pick up right where your journey paused."
      )
    ).toBeVisible();

    await expect(page.getByLabel("Email")).toHaveAttribute(
      "placeholder",
      "m@example.com"
    );
    await expect(page.getByLabel("Password")).toHaveAttribute(
      "placeholder",
      NON_EMPTY_TEXT
    );
    await expect(
      page.getByRole("button", { name: LOGIN_BUTTON_LABEL })
    ).toBeEnabled();

    await expect(
      page.getByRole("link", { name: "Forgot Password?" })
    ).toHaveAttribute("href", "/en/reset-password");
    await expect(
      page.getByRole("link", { name: "Create new account" })
    ).toHaveAttribute("href", "/en/register");

    await expect(
      page.getByRole("button", { name: "Continue with Google" })
    ).toBeVisible();
  });

  test("when user toggles password visibility, input type changes", async ({
    page,
  }) => {
    await page.goto(LOGIN_PATH);

    const passwordInput = page.getByLabel("Password");
    await expect(passwordInput).toHaveAttribute("type", "password");

    await page.getByRole("button", { name: "Show password" }).click();
    await expect(passwordInput).toHaveAttribute("type", "text");

    await page.getByRole("button", { name: "Hide password" }).click();
    await expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("when user clicks Login, validation errors appear", async ({ page }) => {
    await page.goto(LOGIN_PATH);

    await page.getByRole("button", { name: LOGIN_BUTTON_LABEL }).click();

    await expect(page.getByText(ERROR_EMAIL_TEXT)).toBeVisible();
    await expect(page.getByText(ERROR_PASSWORD_TEXT)).toBeVisible();
  });

  test("when user submits without password, only password error appears", async ({
    page,
  }) => {
    await page.goto(LOGIN_PATH);

    await page.getByLabel("Email").pressSequentially(USER.email);
    await page.getByRole("button", { name: LOGIN_BUTTON_LABEL }).click();

    await expect(page.getByText(ERROR_PASSWORD_TEXT)).toBeVisible();
    await expect(page.getByText(ERROR_EMAIL_TEXT)).not.toBeVisible();
  });

  test("when user submits without email, only email error appears", async ({
    page,
  }) => {
    await page.goto(LOGIN_PATH);

    await page.getByLabel("Password").pressSequentially(USER.password);
    await page.getByRole("button", { name: LOGIN_BUTTON_LABEL }).click();

    await expect(page.getByText(ERROR_EMAIL_TEXT)).toBeVisible();
    await expect(page.getByText(ERROR_PASSWORD_TEXT)).not.toBeVisible();
  });

  test("when user logs in with no mfa, navigates to console dashboard", async ({
    page,
  }) => {
    await page.goto(LOGIN_PATH);

    await page.getByLabel("Email").pressSequentially(USER.email);
    await page.getByLabel("Password").pressSequentially(USER.password);
    await page.getByRole("button", { name: LOGIN_BUTTON_LABEL }).click();

    await expect(page).toHaveURL(DASHBOARD_URL);
  });

  test("when user logs in with mfa, navigates to two-factor app", async ({
    page,
  }) => {
    await page.goto(LOGIN_PATH);

    await page.getByLabel("Email").pressSequentially(MFA_USER.email);
    await page.getByLabel("Password").pressSequentially(MFA_USER.password);
    await page.getByRole("button", { name: LOGIN_BUTTON_LABEL }).click();

    await expect(page).toHaveURL(TWO_FACTOR_APP_URL);
  });

  test("when user visits console without cookie, returns to from after login", async ({
    page,
  }) => {
    await page.goto(CONSOLE_ME_PATH);

    await expect(page).toHaveURL(LOGIN_WITH_FROM);

    await page.getByLabel("Email").pressSequentially(USER.email);
    await page.getByLabel("Password").pressSequentially(USER.password);
    await page.getByRole("button", { name: LOGIN_BUTTON_LABEL }).click();

    await expect(page).toHaveURL(CONSOLE_ME_URL);
  });
});
