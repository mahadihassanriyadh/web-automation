import PQueue from "p-queue";
import puppeteer from "puppeteer";
import { setTimeout } from "timers/promises";

/* ##############################################
############# Scrapping Devconfbd ##############
############################################## */

const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 },
    // slowMo: 250,
    userDataDir: "practice-web-automation/temp",
});

const page = await browser.newPage();
await page.goto("https://devconfbd.com/", {
    waitUntil: "networkidle2",
    timeout: 60000,
});

/* ###############################################################
############# Taking a screenshot of the whole page ##############
############# ❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌ ##############
############################################################### */
/* 
const lastElement = await page.waitForSelector("[class='card mb-12']");
await lastElement.scrollIntoView();
await page.screenshot({
    path: "practice-web-automation/devconfbd-screenshot.png",
    fullPage: true,
});
*/

/* ########################################################################################
############# Taking a screenshot of a specific element after clicking on it ##############
######################################################################################## */
// Method 01:
/* 
await page.waitForSelector("img[alt='guest']");
await page.click("img[alt='guest']");
await setTimeout(() => { }, 1000);
await page.screenshot({ path: "practice-web-automation/guest.png" });
*/
// Method 02:
/* 
const guestElement = await page.waitForSelector("img[alt='guest']");
await guestElement.scrollIntoView();
await setTimeout(1000);
await guestElement.click();
await setTimeout(1000);
await page.screenshot({ path: "practice-web-automation/guest.png" });
*/

/* ##############################################################
############# All sponsors and supporters Websites ##############
############################################################## */
// we can get all the supporters and sponsors data by this document.querySelectorAll('.sponsors a, .supporter a')
// we can get all the data in an array as well, like this: [...document.querySelectorAll('.sponsors a, .supporter a')]
// we can also get all the links from the data, like this: [...document.querySelectorAll('.sponsors a, .supporter a')].map(link => link.href)
/* 
await page.waitForSelector(".sponsors a, .supporter a");
const sponsorLinks = await page.evaluate(() => {
    return [...document.querySelectorAll(".sponsors a")].map(
        (link) => link.href
    );
});
const supporterLinks = await page.evaluate(() => {
    return [...document.querySelectorAll(".supporter a")].map(
        (link) => link.href
    );
});
console.log({ sponsorLinks, supporterLinks });
*/

/* ###################################################################
############## All sponsors and supporters Facebook Link #############
################################################################### */

await page.waitForSelector(".sponsors a, .supporter a");
const sponsorLinks = await page.evaluate(() => {
    return [...document.querySelectorAll(".sponsors a")].map(
        (link) => link.href
    );
});
const supporterLinks = await page.evaluate(() => {
    return [...document.querySelectorAll(".supporter a")].map(
        (link) => link.href
    );
});
console.log({ sponsorLinks, supporterLinks });

async function getFacebookLink(link) {
    const page = await browser.newPage();
    await page.goto(link, {
        waitUntil: "networkidle2",
        timeout: 60000,
    });
    const title = await page.title();
    console.log(title);
    const hostName = await page.evaluate(() => window.location.hostname);
    console.log(hostName);
    await page.screenshot({ path: `practice-web-automation/${hostName}.png` });

    // await page.waitForSelector('[href*="facebook"]');
    const facebookLink = await page.evaluate(() => {
        return document.querySelector('[href*="facebook"]')?.href;
    });
    console.log({ link, title, hostName, facebookLink });

    await page.close();
}

// Way 01: (not recommended)
// for (let link of supporterLinks) {
//     await getFacebookLink(link);
// }

// Way 02: Using a library called p-queue to run the function parallelly for multiple links at a time
const queue = new PQueue({ concurrency: 2 });
for (let link of supporterLinks) {
    queue.add(() => getFacebookLink(link)).catch((error) => console.log(error));
}

// waiting for the queue to be empty
await queue.onEmpty();

await browser.close();
