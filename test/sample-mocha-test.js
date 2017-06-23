var selenium = require('selenium-webdriver'),
    chai = require('chai'),
    assert = chai.assert;
    test = require('selenium-webdriver/testing');

test.describe('Mocha and Electron Test', function(){ 

  test.it('has the title of the post in the window\'s title', function(){
    this.timeout(7000);
    var driver = new selenium.Builder()
      // .withCapabilities(selenium.Capabilities.chrome()) //Works with regular chrome
      .usingServer('http://localhost:9515') //works with regular chrome
      .withCapabilities({
        chromeOptions: {
          // Here is the path to your Electron binary.
          // binary: '/Path-to-Your-App.app/Contents/MacOS/Atom',
          // binary: '/Users/stephaniegama/electron-quick-start/node_modules/electron-prebuilt/cli.js',
          // binary: '/Users/stephaniegama/electron-quick-start/node_modules/electron-prebuilt/dist/Electron.app/Contents/MacOS/Electron',
          binary: '/Users/stephaniegama/electron-v0.36.2-mas-x64/Electron.app/Contents/MacOS/Electron',
        }
      })
      .forBrowser('electron')
      .build(); //works with regular chrome
    driver.getWindowHandle();
    driver.wait(function() {
      return driver.getTitle().then(function(title) {
        console.log("The title is" + title);
          return title === 'This is a Test Electron App!';
      });
    }, 8000);
    driver.wait(function(){
      return driver.findElement(selenium.By.xpath('//h1')).getText().then(function(headerText){
        console.log("The header is " + headerText);
        return headerText === 'Test Electron App for JIBO!';
      });
    }, 8000);
    driver.findElement(selenium.By.id("ButtonA")).isDisplayed().then(function(buttonAisDisplayed){
      console.log("ButtonA is displayed " + buttonAisDisplayed);
      assert.equal(buttonAisDisplayed, true, 'Asserting the ButtonA is displayed');
    });
    driver.findElement(selenium.By.id("ButtonB")).isDisplayed().then(function(buttonBisDisplayed){
      console.log("ButtonB is displayed " + buttonBisDisplayed);
      assert.equal(buttonBisDisplayed, true, 'Asserting the ButtonB is displayed');
    });
    driver.findElement(selenium.By.id("sampleTextBox")).isDisplayed().then(function(textBoxIsDisplayed){
      console.log("The textbox is displayed " + textBoxIsDisplayed);
      assert.equal(textBoxIsDisplayed, true, 'Asserting the ButtonB is displayed');
    });

    driver.findElement(selenium.By.id("ButtonA")).click().then(function(){
      driver.wait(function(){ 
        return driver.findElement(selenium.By.id("sampleTextBox")).getText().then(function(textOfSampleTextBox){
          console.log("After clicking buttonA the text is " + textOfSampleTextBox);
          return textOfSampleTextBox != null;
        });
      }, 4000);
    });
    driver.findElement(selenium.By.id("sampleTextBox")).getText().then(function(textOfSampleTextBox){
        console.log("Second Check: After clicking buttonA the text is " + textOfSampleTextBox);
        assert.notEqual(textOfSampleTextBox, "Hello World", 'Asserting the textbox, after clickinb ButtonA');
        assert.equal(isNaN(textOfSampleTextBox), false, "The text is a number");
    });

    driver.findElement(selenium.By.id("ButtonB")).click().then(function(){
      // driver.manage().timeouts().implicitlyWait(30 * 1000);
      var afterclick = function(){ 
        driver.findElement(selenium.By.id("sampleTextBox")).getText().then(function(textOfSampleTextBox){
          console.log("After clicking buttonB the text is " + textOfSampleTextBox);
          // driver.manage().timeouts().implicitlyWait(30 * 1000);
          // return textOfSampleTextBox != null;
        })};
      setTimeout(afterclick(), 4000);
    });
    driver.findElement(selenium.By.id("sampleTextBox")).getText().then(function(textOfSampleTextBox){
        console.log("Second Check: After clicking buttonB the text is " + textOfSampleTextBox);
        assert.equal(textOfSampleTextBox, "Hello World", 'Asserting the textbox does not display Hello World');
        assert.equal(isNaN(textOfSampleTextBox), true, "The text is a not a number");
    });

    driver.quit();
  });

});