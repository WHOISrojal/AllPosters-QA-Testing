const { test, expect } = require("@playwright/test");
const testData = require("../fixtures/loginFixture.json");
import { LoginPage } from "../pageObjects/login.po.js";
import { ContactPage } from "../pageObjects/contactFill.po.js";

test.describe.configure({ timeout:60000});
test.describe("Goto Page and Login", () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await page.goto("https://www.allposters.com/");
    await expect(page).toHaveTitle(/AllPosters/);
    await login.navigateToLogin();
    await login.login(testData.validUser.email, testData.validUser.password);
    await login.submit();
  });
  
  test("Login using valid credentials", async ({ page }) => {
    const login = new LoginPage(page);
    await login.navigateToLogin();
    await login.login(testData.validUser.email, testData.validUser.password);
    await login.submit();
  });

  test("Search for an item", async ({ page }) => {
    const login = new LoginPage(page);
    await login.search(testData.search.searchTerm); 
    // await expect(page.locator('text=Search Results')).toBeVisible(); 
    await page.pause();
  });

  test("Search and select poster", async ({ page }) => {
    const login = new LoginPage(page);
    await login.search(testData.search.searchTerm); 
    await login.selectPoster(); 
    await page.pause();
  });

  test("Add to Cart", async ({ page }) => {
    const login = new LoginPage(page);
    await login.search(testData.search.searchTerm); 
    await login.selectPoster(); 
    await login.addCart();
    await page.pause();
  });

  test("Checkout", async ({ page }) => {
    const login = new LoginPage(page);
    await login.search(testData.search.searchTerm); 
    await login.selectPoster(); 
    await login.addCart();
    await login.checkoutfn();
  });

  test("Customer Fill", async ({ page }) => {
    const login = new LoginPage(page);
    const contact = new ContactPage(page)
    await login.search(testData.search.searchTerm); 
    await login.selectPoster(); 
    await login.addCart();
    await login.checkoutfn();
    await contact.customerFill();
  });

  test("Payment", async ({ page }) => {
    const login = new LoginPage(page);
    const contact = new ContactPage(page)
    await login.search(testData.search.searchTerm); 
    await login.selectPoster(); 
    await login.addCart();
    await login.checkoutfn();
    await contact.customerFill();
    await login.payButton();
  });

  test("Logout", async ({ page }) => {
    const login = new LoginPage(page);
    const contact = new ContactPage(page)
    await login.search(testData.search.searchTerm); 
    await login.selectPoster(); 
    await login.addCart();
    await login.checkoutfn();
    await contact.customerFill();
    await login.payButton();
    await login.logoutfn();
  });

  test.only("Login, search, select, addCart, viewCart checkout, customerfill, payment", async ({ page }) => {
    const login = new LoginPage(page);
    const contact = new ContactPage(page);

    await login.search(testData.search.searchTerm); 
    // await expect(page.locator('text=Search Results')).toBeVisible(); 
    await login.selectPoster(); // Select the poster item
    // await expect(page.locator('text=Poster Details')).toBeVisible(); 

    await login.addCart();
    
    await login.viewCart();

    // await login.selectQuantity(2); // Select quantity 2

    await login.removefn();

    await login.removeConfirmfn();

    await page.goto("https://www.allposters.com");

    await login.search(testData.search.newsearchTerm); 

    await login.newposterSelectfn();

    await login.addCart();

    await login.viewCart2();

    await login.checkoutfn();

    await contact.customerFill();

    await login.payButton();

    await page.goto("https://www.allposters.com");

    await login.logoutfn();

    await page.pause();
  });

});

