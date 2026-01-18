import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

const REGISTER_PATH = "/en/register";
const NON_EMPTY_TEXT = /.+/;

const REGISTER_BUTTON_LABEL = "Create account";
const ERROR_NAME_TEXT = "Please enter your name";
const ERROR_EMAIL_TEXT = "Please enter a valid email address";
const ERROR_PASSWORD_EMPTY_TEXT = "Please enter your password";
const ERROR_PASSWORD_LENGTH_TEXT = "Password must be at least 8 characters";
const ERROR_CAPTCHA_TEXT = "Please complete the captcha";
const NEW_USER = {
  name: faker.person.lastName(),
  email: faker.internet.email(),
  password: "Secret123!",
} as const;

test.describe("Auth Register", () => {
  test("UI matches design specifications", async ({ page }) => {
    await page.goto(REGISTER_PATH);

    await expect(
      page.getByRole("heading", { level: 1, name: "Create an account" })
    ).toBeVisible();
    await expect(
      page.getByText("Let's set up your account. Tell us a bit about yourself.")
    ).toBeVisible();

    await expect(page.getByLabel("Name")).toHaveAttribute(
      "placeholder",
      "Jane Doe"
    );
    await expect(page.getByLabel("Email")).toHaveAttribute(
      "placeholder",
      "m@example.com"
    );
    await expect(page.getByLabel("Password")).toHaveAttribute(
      "placeholder",
      NON_EMPTY_TEXT
    );

    await expect(
      page.getByRole("button", { name: REGISTER_BUTTON_LABEL })
    ).toBeEnabled();

    await expect(
      page.getByRole("link", { name: "Terms of Service" })
    ).toHaveAttribute("href", "/en/terms");
    await expect(
      page.getByRole("link", { name: "Privacy Policy" })
    ).toHaveAttribute("href", "/en/privacy");
    await expect(page.getByRole("link", { name: "Login" })).toHaveAttribute(
      "href",
      "/en/login"
    );

    await expect(
      page.getByRole("button", { name: "Continue with Google" })
    ).toBeVisible();
  });

  test("when user toggles password visibility, input type changes", async ({
    page,
  }) => {
    await page.goto(REGISTER_PATH);

    const passwordInput = page.getByLabel("Password");
    await expect(passwordInput).toHaveAttribute("type", "password");

    await page.getByRole("button", { name: "Show password" }).click();
    await expect(passwordInput).toHaveAttribute("type", "text");

    await page.getByRole("button", { name: "Hide password" }).click();
    await expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("when user submits without input, validation errors appear", async ({
    page,
  }) => {
    await page.goto(REGISTER_PATH);

    await page.getByRole("button", { name: REGISTER_BUTTON_LABEL }).click();

    await expect(page.getByText(ERROR_NAME_TEXT)).toBeVisible();
    await expect(page.getByText(ERROR_EMAIL_TEXT)).toBeVisible();
    await expect(page.getByText(ERROR_PASSWORD_LENGTH_TEXT)).toBeVisible();
    await expect(page.getByText(ERROR_CAPTCHA_TEXT)).toBeVisible();
  });

  test("when user submits without name, name error appears", async ({
    page,
  }) => {
    await page.goto(REGISTER_PATH);

    await page.getByLabel("Email").pressSequentially(NEW_USER.email);
    await page.getByLabel("Password").pressSequentially(NEW_USER.password);
    await page.getByRole("button", { name: REGISTER_BUTTON_LABEL }).click();

    await expect(page.getByText(ERROR_NAME_TEXT)).toBeVisible();

    await expect(page.getByText(ERROR_EMAIL_TEXT)).not.toBeVisible();
    await expect(page.getByText(ERROR_PASSWORD_EMPTY_TEXT)).not.toBeVisible();
    await expect(page.getByText(ERROR_CAPTCHA_TEXT)).not.toBeVisible();
  });

  test("when user submits without email, email error appears", async ({
    page,
  }) => {
    await page.goto(REGISTER_PATH);

    await page.getByLabel("Name").pressSequentially(NEW_USER.name);
    await page.getByLabel("Password").pressSequentially(NEW_USER.password);
    await page.getByRole("button", { name: REGISTER_BUTTON_LABEL }).click();

    await expect(page.getByText(ERROR_EMAIL_TEXT)).toBeVisible();

    await expect(page.getByText(ERROR_NAME_TEXT)).not.toBeVisible();
    await expect(page.getByText(ERROR_PASSWORD_EMPTY_TEXT)).not.toBeVisible();
    await expect(page.getByText(ERROR_CAPTCHA_TEXT)).not.toBeVisible();
  });

  test("when user submits without password, password error appears", async ({
    page,
  }) => {
    await page.goto(REGISTER_PATH);

    await page.getByLabel("Name").pressSequentially(NEW_USER.name);
    await page.getByLabel("Email").pressSequentially(NEW_USER.email);
    await page.getByRole("button", { name: REGISTER_BUTTON_LABEL }).click();

    await expect(page.getByText(ERROR_PASSWORD_LENGTH_TEXT)).toBeVisible();

    await expect(page.getByText(ERROR_NAME_TEXT)).not.toBeVisible();
    await expect(page.getByText(ERROR_EMAIL_TEXT)).not.toBeVisible();
    await expect(page.getByText(ERROR_CAPTCHA_TEXT)).not.toBeVisible();
  });

  test("when user submits valid input, registration success message appears", async ({
    page,
  }) => {
    await page.goto(REGISTER_PATH);

    await page.getByLabel("Name").pressSequentially(NEW_USER.name);
    await page.getByLabel("Email").pressSequentially(NEW_USER.email);
    await page.getByLabel("Password").pressSequentially(NEW_USER.password);
    await page.waitForSelector('iframe[src*="challenges.cloudflare.com"]', {
      timeout: 10_000,
    });
    await page.getByRole("button", { name: REGISTER_BUTTON_LABEL }).click();

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Registration successful!",
      })
    ).toBeVisible();
    await expect(
      page.getByText(
        "We've sent a verification link to your email address. Please verify your email to activate your account."
      )
    ).toBeVisible();
  });
});
