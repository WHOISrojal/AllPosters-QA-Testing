const { test, expect } = require("@playwright/test");
const testData = require("../fixtures/loginFixture.json");
import { LoginPage } from "../pageObjects/login.po.js";
import { ContactPage } from "../pageObjects/contactFill.po.js";

test.describe.configure({ mode:"serial"});
test.describe.configure({ timeout:60000 });
test.describe("Go to Page and Login", () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await page.goto("https://www.allposters.com/");
    await login.navigateToLogin();
    await login.login(testData.validUser.email, testData.validUser.password);
    await login.submit();
  });

  test('Successful Logout', async ({ page }) => {
    const login = new LoginPage(page);
    await login.logoutfn();
  });

  test('Session Termination check', async ({ page }) => {
    const login = new LoginPage(page);
    await login.logoutfn();
    await page.goto('https://www.allposters.com/account');
    await page.pause();
  });

});