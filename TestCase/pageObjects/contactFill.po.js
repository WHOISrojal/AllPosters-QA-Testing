const { test, expect } = require("@playwright/test");
const testData = require("../fixtures/loginFixture.json");

exports.ContactPage = class ContactPage {
    constructor(page) {
      this.page = page;
      this.firstname = testData.contactDetail.firstName;
      this.lastname = testData.contactDetail.lastName;
      this.addr = testData.contactDetail.address;
      this.cty = testData.contactDetail.city;
      this.zipcode = testData.contactDetail.zip;
      this.phn = testData.contactDetail.phone;
    }
    
    async customerFill() {
      await this.page.locator('//*[@id="shippingFirstNamedefault"]').fill(this.firstname);
      await this.page.locator('//*[@id="shippingLastNamedefault"]').fill(this.lastname);
      await this.page.locator('//*[@id="shippingAddressOnedefault"]').fill(this.addr);
      await this.page.locator('//*[@id="shippingAddressCitydefault"]').fill(this.cty);
      await this.page.locator('//*[@id="shippingZipCodedefault"]').fill(this.zipcode);
      await this.page.locator('//*[@id="shippingPhoneNumberdefault"]').fill(this.phn);
      await this.selectCountry('US'); // Add this line to select the country
    }

    async selectCountry(countryCode) {
        await this.page.selectOption('#shippingCountrydefault', countryCode);
      }
  };
