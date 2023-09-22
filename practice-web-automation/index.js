const puppeteer = require("puppeteer");

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.traversymedia.com/");

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

    await browser.close();
}

run();
