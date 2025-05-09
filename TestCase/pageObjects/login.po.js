const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('//*[@id="email"]');
    this.passwordInput = page.locator('//*[@id="password"]');
    this.loginButton = page.locator('//*[@id="header-container"]/div/div/div[1]/div[2]/div[1]/div/button'); 
    this.errorMessage = page.locator('.form-message-text'); // Assuming this is the error message locator
    this.submitloginButton = page.locator('//*[@id="login-form"]/div/div[2]/button');
    this.searchInput = page.locator('//*[@id="search-input"]').first();
    this.searchButton = page.locator('//*[@id="popover-trigger-:R19plb9bambpH1:"]/div/div[1]/div'); 
    this.posterImage = page.locator('#grid-container > div:nth-child(2) > a');
    this.addToCart = page.locator('//*[@id="app-main"]/div/div[1]/div/div/div[1]/div[3]/div/div/div[4]/button');
    this.viewtheCart = page.locator('xpath=//button[text()="View Cart"]');
    // this.quantityDropdown = page.locator('//*[@id="quantity-27b3d98d2ee5d16d67f15fdb98"]');  
    this.quantityDropdown = page.locator('//*[@id="quantity-f78516b5a32618cf8e338d0c09"]'); 
    this.remove = page.locator('//*[@id="maincontent"]/div[4]/div[1]/div[1]/div[2]/div/div[3]/div/button');  
    this.removeConfirm = page.locator("//button[@class='cart-delete-confirmation-btn button-default button-primary']");
    this.newposterImage = page.locator('//*[@id="81eed236eeecce1f22f49dc2a8"]/div/div/a/picture/img');
    this.newposterSelect = page.locator('#grid-container > div:nth-child(6) > a');
    this.viewtheCart2 = page.locator('//*[@id="chakra-modal--body-:r33:"]/div/div[3]/div/button');
    this.checkout = page.locator('//*[@id="start-checkout-button"]');
    this.paymentbtn = page.locator('//*[@id="checkout-main"]/div/div[2]/div[9]/div/div/button[1]');
    this.finalloginButton = page.locator('//*[@id="popover-trigger-:r1r:"]');
    this.logout = page.locator('//*[@id="app-main"]/div/div/div[2]/nav/button');    
  }

  async navigateToLogin() {
    await this.loginButton.click();
    // await this.page.waitForTimeout(9000); 
    await this.page.waitForLoadState("domcontentloaded");
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    // await this.page.waitForTimeout(2000); 
    await this.passwordInput.fill(password);
    // await this.page.waitForTimeout(3000); 
  }

  async submit() {
    await this.submitloginButton.click(); 
    await this.page.waitForLoadState("domcontentloaded");
  }

  async search(term) {
    await this.page.waitForTimeout(8000);
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter'); 
    await this.page.waitForLoadState("domcontentloaded");
  }

  async searchfordiffcase(term) {
    await this.page.waitForTimeout(2000);
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter'); 
    await this.page.waitForLoadState("domcontentloaded");
  }

  async selectPoster() {
    await this.posterImage.waitFor({ state: 'visible', timeout: 20000 });
    await this.posterImage.click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 20000 }); 
  }

  async addCart() {
    await this.addToCart.click();
    await this.page.waitForTimeout(3000); 
    await this.page.waitForLoadState("domcontentloaded");
    // await this.page.waitForTimeout(3000); 
  }
  async viewCart() {
    await this.viewtheCart.click();
    await this.page.waitForTimeout(3000); 
    await this.page.waitForLoadState("domcontentloaded");
    // await this.page.waitForTimeout(3000); 
  }

  async selectQuantity(quantity) {
    await this.page.waitForTimeout(5000); 
    await this.quantityDropdown.selectOption({ label: quantity.toString() });
    await this.page.waitForLoadState("domcontentloaded"); 
  }

  async removefn() {
    await this.page.waitForTimeout(1000); 
    await this.remove.click();
    await this.page.waitForLoadState("domcontentloaded"); 
  }

  async removeConfirmfn() {
    await this.page.waitForTimeout(2000); 
    await this.removeConfirm.click();
    await this.page.waitForLoadState("domcontentloaded"); 
  }

  async newposterSelectfn(){
    await this.newposterSelect.waitFor({ state: 'visible' });
    await this.newposterSelect.click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 20000 }); 
  }

  async viewCart2() {
    await this.viewtheCart2.click();
    await this.page.waitForTimeout(2000); 
    await this.page.waitForLoadState("domcontentloaded");
    // await this.page.waitForTimeout(3000); 
  }

  async checkoutfn() {
    await this.checkout.click();
    await this.page.waitForLoadState("domcontentloaded"); 
  }

  async payButton() {
    await this.paymentbtn.click();
    await this.page.waitForLoadState("domcontentloaded"); 
  }
  
  async logoutfn(){
    await this.finalloginButton.click();
    await this.page.waitForTimeout(3000);
    await this.logout.click();
  }

  async getErrorMessage() {
    const errorMessage = await this.page.locator(".form-message-text").innerText();
    return errorMessage.trim();
  }

  async verifyLoginSuccess() {
    // Implement verification logic if needed
    await expect(this.page.locator("text=Logout")).toBeVisible(); 
  }
};
