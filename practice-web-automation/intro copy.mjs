import puppeteer from "puppeteer";
import { setTimeout } from "timers/promises";

const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 },
    // slowMo: 250,
    userDataDir: "temp",
});

const page = await browser.newPage();
await page.goto("https://www.google.com/", {
    waitUntil: "networkidle2",
    timeout: 60000,
});
await page.screenshot({ path: "google-screenshot.png" });

// taking a screenshot
// await page.screenshot({path: 'screenshot.png', fullPage: true});

// creating a pdf
// await page.pdf({path: 'page.pdf', format: 'A4'});

// All the HTML of the page
// const html = await page.content();
// console.log(html);

// Method 1: Get the title of the page
// const title1 = await page.evaluate(() => document.title);
// console.log(title1);

// Method 2: Get the title of the page
// const title2 = await page.title();
// console.log(title2);

await page.goto("https://devconfbd.com/");
await page.screenshot({ path: "devconfbd-screenshot.png" });
await page.waitForSelector("img[alt='guest']");
await page.click("img[alt='guest']");
await setTimeout(() => { }, 1000);
await page.screenshot({ path: "guest.png" });
const guestElement = await page.waitForSelector("img[alt='guest']");
await guestElement.scrollIntoView();
await setTimeout(1000);
await guestElement.click();
await setTimeout(1000);
await page.screenshot({ path: "guest.png" });
/* ##############################################
############ Collecting the sponsors ############
############################################## */
await browser.close();
