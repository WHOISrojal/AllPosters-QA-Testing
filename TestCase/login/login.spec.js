const { test, expect } = require("@playwright/test");
const testData = require("../fixtures/loginFixture.json");
import { LoginPage } from "../pageObjects/login.po.js";
import { ContactPage } from "../pageObjects/contactFill.po.js";

test.describe.configure({ timeout:60000 });
test.describe("Goto Page and Login", () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await page.goto("https://www.allposters.com/");
    await login.navigateToLogin();
    // Perform login
    await login.login(testData.validUser.email, testData.validUser.password);
    await login.submit();
    // await expect(page).toHaveTitle(/Allposters/);
  });
  
  test("Login using valid credentials", async ({ page }) => {
    const login = new LoginPage(page);
    await login.navigateToLogin();
    // Perform login
    await login.login(testData.invalidUser.email, testData.invalidUser.password);
    await login.submit();
    // await page.pause();
  });

  test("Search for an item", async ({ page }) => {
    const login = new LoginPage(page);
    await login.search(testData.search.searchTerm); // Search for "posters"
    // await expect(page.locator('text=Search Results')).toBeVisible(); // Verify that search results are displayed
    await page.pause();
  });

  test("Search and select poster", async ({ page }) => {
    const login = new LoginPage(page);
    await login.search(testData.search.searchTerm); // Search for "posters"
    await login.selectPoster(); 
    // await expect(page.locator('text=Search Results')).toBeVisible(); // Verify that search results are displayed
    await page.pause();
  });

  test.only("Login, search, select, addCart, checkout, ", async ({ page }) => {
    const login = new LoginPage(page);
    const contact = new ContactPage(page);

    await login.search(testData.search.searchTerm); // Use the search term from loginFixture.json

    // await expect(page.locator('text=Search Results')).toBeVisible(); // Verify that search results are displayed
    await login.selectPoster(); // Select the poster item
    // await expect(page.locator('text=Poster Details')).toBeVisible(); // Verify that the poster details page is displayed (adjust as needed)

    await login.addCart();

    // await login.selectQuantity(2); // Select quantity 2

    await login.checkoutfn();

    await contact.customerFill();

    await login.payButton();

    await page.goto("https://www.allposters.com");

    await page.pause();
  });

});






// test("Login using wrong email and password", async ({ page }) => {
//   const login = new LoginPage(page);
//   // Navigate to the login form
//   await login.navigateToLogin();

//   // Perform login
//   await login.login(
//     testData.invalidUser.email,
//     testData.invalidUser.password
//   );
//   await login.submit();
//   const errorMessage = await login.getErrorMessage();
//   await expect(errorMessage).toContain("Invalid credentials"); // Adjust based on actual error message
// });
