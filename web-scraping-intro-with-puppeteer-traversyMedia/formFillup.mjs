import puppeteer from "puppeteer";
import { setTimeout } from "timers/promises";

const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 },
    // slowMo: 250,
    userDataDir: "temp",
});

const page = await browser.newPage();
// searchbox_input
await page.goto("https://duckduckgo.com/", {
    waitUntil: "networkidle2",
    timeout: 60000,
});
await page.waitForSelector("#searchbox_input");
await page.type("#searchbox_input", 'best burger restaurant in dhaka');
await page.click("[aria-label='Search']");
await page.waitForSelector('[data-testid="result"]');
await page.screenshot({ path: "best-burger-place-in-dhaka.png" });

await browser.close();


// Resources / Cheat Sheets to help with CSS Selectors
// https://flukeout.github.io/
// https://frontend30.com/
// https://devhints.io/xpath
// https://devhints.io/css
