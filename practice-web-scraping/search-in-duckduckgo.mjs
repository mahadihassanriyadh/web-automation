import puppeteer from "puppeteer";
import { setTimeout } from "timers/promises";

const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 },
    // slowMo: 250,
    userDataDir: "practice-web-scraping/temp",
});

/* ##############################################
# Searching in Duckduckgo & Taking Screenshots #
############################################## */

const page = await browser.newPage();
// searchbox_input
await page.goto("https://duckduckgo.com/", {
    waitUntil: "networkidle2",
    timeout: 60000, // 60 seconds
});

/* #############
#### WAY 01 ####
############# */

// await page.waitForSelector("#searchbox_input");
// await page.type("#searchbox_input", "best burger restaurant in dhaka");
// await page.click("[aria-label='Search']");
// await page.waitForSelector('[data-testid="result"]');
// await page.screenshot({ path: "best-burger-place-in-dhaka.png" });

/* #############
#### WAY 02 ####
############# */
const searchBarHanlde = await page.waitForSelector("#searchbox_input");
await searchBarHanlde.type("best burger restaurant in dhaka");

const searchButtonHanlde = await page.waitForSelector("[aria-label='Search']");
await searchButtonHanlde.click();

const firstResult = await page.waitForSelector('[data-testid="result"]');
await firstResult.screenshot({
    path: "practice-web-scraping/best-burger-place-in-dhaka-1.png",
});

await page.screenshot({
    path: "practice-web-scraping/best-burger-place-in-dhaka-2.png",
});


// Resources / Cheat Sheets to help with CSS Selectors
// https://flukeout.github.io/
// https://frontend30.com/
// https://devhints.io/xpath
// https://devhints.io/css
