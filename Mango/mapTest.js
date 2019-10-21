/* Testing leaflet map with selenium
link is now localhost:3030/map, maybe changed later on
*/
const {Builder, By, Key, util} = require("selenium-webdriver");
async function example() {
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get("http://localhost:3000/map").then(function(){console.log("localhost:3000/map is opened")});
    await driver.findElement(By.name("q")).sendKeys("selenium",Key.RETURN).then(function(){console.log("input selenium and hit return")});
}
example();