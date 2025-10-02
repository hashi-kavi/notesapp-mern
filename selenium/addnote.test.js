
const { Builder, By, until } = require('selenium-webdriver');
describe('Selenium Add Note Test', () => {
  it('should add a note via UI', async () => {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get('http://localhost:3000/notes');
      await driver.findElement(By.css('input[type="text"]')).sendKeys('Selenium Note');
      await driver.findElement(By.css('button[type="submit"]')).click();
      await driver.wait(until.elementLocated(By.xpath("//li[contains(., 'Selenium Note')]")), 5000);
      console.log('Add note test passed');
    } finally {
      await driver.quit();
    }
  }, 20000); // Increase timeout for Selenium
});
