var webdriverio = require('webdriverio');
var assert = require('assert');
var options = {
            host: "localhost", // Use localhost as chrome driver server
            port: 9515,        // "9515" is the port opened by chrome driver.
            desiredCapabilities: {
                browserName: 'chrome',
                chromeOptions: {
                  binary: '/Users/stephaniegama/electron-v0.36.2-mas-x64/Electron.app/Contents/MacOS/Electron', // Path to your Electron binary.
                  // args: [/* cli arguments */]           // Optional, perhaps 'app=' + /path/to/your/app/
                }
            }
        };
var client = webdriverio.remote(options); 
        
client
    .init()
    .pause(2000)//Uncomment to make app be more visible
    .getTitle().then(function(title) {
        console.log("The title is" + title);
        assert.equal(title, 'This is a Test Electron App!');
    })
    .getText('h1').then(function(headerText){
        console.log("The header is " + headerText);
        assert.equal(headerText,'Test Electron App for JIBO!');
    })
    .isVisible("#ButtonA").then(function(buttonAisDisplayed){
      console.log("ButtonA is displayed " + buttonAisDisplayed);
      assert.equal(buttonAisDisplayed, true, 'Asserting the ButtonA is displayed');
    })
    .isVisible("#ButtonB").then(function(buttonBisDisplayed){
      console.log("ButtonB is displayed " + buttonBisDisplayed);
      assert.equal(buttonBisDisplayed, true, 'Asserting the ButtonB is displayed');
    })
    .isVisible("#sampleTextBox").then(function(textBoxIsDisplayed){
      console.log("The textbox is displayed " + textBoxIsDisplayed);
      assert.equal(textBoxIsDisplayed, true, 'Asserting the ButtonB is displayed');
    })
    .click('#ButtonA') //Clicking the button that generates a random number
    .waitForValue("#sampleTextBox")
    .getValue("#sampleTextBox").then(function(textOfSampleTextBox){
        console.log("After clicking buttonA the text is " + textOfSampleTextBox);
        assert.notEqual(textOfSampleTextBox, "Hello World", 'Asserting the textbox value, after clickinb ButtonA, is not Hello World');
        assert.notEqual(textOfSampleTextBox, "", 'Asserting the textbox value is not empty');
        assert.equal(isNaN(textOfSampleTextBox), false, "The text is a number");
    })
    .pause(1000)//Just to see change in text
    .click('#ButtonB') //Clicking the button that generates the 'Hello World'
    .pause(1000)
    .getValue("#sampleTextBox").then(function(textOfSampleTextBox){
        console.log("After clicking buttonB the text is " + textOfSampleTextBox);
        assert.equal(textOfSampleTextBox, "Hello World", 'Asserting the textbox value, after clicking ButtonB, is Hello World');
        assert.notEqual(textOfSampleTextBox, "", 'Asserting the textbox value is not empty');
        assert.equal(isNaN(textOfSampleTextBox), true, "The text is a not a number");
    })
    .pause(1000)//Just to see change in text
    .end();