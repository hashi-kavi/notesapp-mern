const { Builder, By, until } = require('selenium-webdriver');

async function runLoginTest() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    console.log('Starting login test...');
    
    await driver.get('http://localhost:3000/login');
    
    // Use correct selectors
    await driver.findElement(By.css('input[type="text"]')).sendKeys('demouser123');
    await driver.findElement(By.css('input[type="password"]')).sendKeys('DemoPass123');
    await driver.findElement(By.css('button[type="submit"]')).click();
    
    // Wait for redirect
    await driver.wait(until.urlContains('/notes'), 10000);
    console.log('✅ Login test PASSED');
    
  } catch (error) {
    console.log('❌ Login test FAILED:', error.message);
  } finally {
    await driver.quit();
  }
}

// Run the test
runLoginTest();
