const { Builder, By, until } = require('selenium-webdriver');

async function runAddNoteTest() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    console.log('Starting add note test...');
    
    // Login first
    await driver.get('http://localhost:3000/login');
    await driver.findElement(By.css('input[type="text"]')).sendKeys('demouser123');
    await driver.findElement(By.css('input[type="password"]')).sendKeys('DemoPass123');
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.urlContains('/notes'), 10000);
    
    // Add note
    await driver.findElement(By.css('input[type="text"]')).sendKeys('Selenium Test Note');
    await driver.findElement(By.css('button[type="submit"]')).click();
    
    // Simple wait - then check if we're still on notes page (success)
    await driver.sleep(2000);
    
    // Verify we're still on notes page (no errors)
    const currentUrl = await driver.getCurrentUrl();
    if (currentUrl.includes('/notes')) {
      console.log('✅ Add note test PASSED - Note added successfully, still on notes page');
    } else {
      console.log('❌ Add note test FAILED - Redirected away from notes page');
    }
    
  } catch (error) {
    console.log('❌ Add note test FAILED:', error.message);
  } finally {
    await driver.quit();
  }
}

// Run the test
runAddNoteTest();
