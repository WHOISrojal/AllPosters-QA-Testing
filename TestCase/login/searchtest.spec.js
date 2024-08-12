const { test, expect } = require('@playwright/test');
const testData = require('../fixtures/loginFixture.json');
const { LoginPage } = require('../pageObjects/login.po.js');
// const { ContactPage } = require('../pageObjects/contactFill.po.js');

// test.describe.configure({ timeout: 60000 });
test.describe.configure({ mode:"serial"});
test.describe('Search Test Case', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.allposters.com/');
  });

  test("Search with valid term", async ({ page }) => {
    const login = new LoginPage(page);
    await login.searchfordiffcase(testData.search.searchTerm);  
    await page.waitForTimeout(2000);
    // await page.pause();
  });

  test('Search with invalid term(random string)', async ({ page }) => {
    const login = new LoginPage(page);
    await login.searchfordiffcase(testData.search.randomSearch);
    await page.waitForTimeout(2000);
    // await expect(
    //   page.locator('text=Uh oh! Looks like something went wrong on our end. Please try again later, or head back to the homepage.')
    // ).toBeVisible();
  });

  test('Search with empty input', async ({ page }) => {
    const login = new LoginPage(page);
    await login.searchfordiffcase(testData.search.emptySearch);
    await page.waitForTimeout(2000);
    // await page.pause();
  });

  test('Search with special characters only', async ({ page }) => {
    const login = new LoginPage(page);
    await login.searchfordiffcase(testData.search.specialcharSearch);
    await page.waitForTimeout(2000);
    // await page.pause();
  });

  test('Search with long characters', async ({ page }) => {
    const login = new LoginPage(page);
    await login.searchfordiffcase(testData.search.longcharSearch);
    await page.waitForTimeout(2000);
    // await page.pause();
  });

  test('Search with upper and lower case', async ({ page }) => {
    const login = new LoginPage(page);
    await login.searchfordiffcase(testData.search.caseinsensitiveSearch);
    await page.pause();
  });

});