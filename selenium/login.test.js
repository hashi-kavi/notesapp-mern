
const { Builder, By, until } = require('selenium-webdriver');
describe('Selenium Login Test', () => {
  it('should login via UI', async () => {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get('http://localhost:3000/login');
      await driver.findElement(By.css('input[type="text"]')).sendKeys('testuser');
      await driver.findElement(By.css('input[type="password"]')).sendKeys('testpass');
      await driver.findElement(By.css('button[type="submit"]')).click();
      // Handle alert if present
      try {
        await driver.wait(until.alertIsPresent(), 2000);
        let alert = await driver.switchTo().alert();
        await alert.accept();
      } catch (e) {
        // No alert present, continue
      }
      await driver.wait(until.elementLocated(By.css('h2')), 5000);
      console.log('Login test passed');
    } finally {
      await driver.quit();
    }
  }, 20000); // Increase timeout for Selenium
});
