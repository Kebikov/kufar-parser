import puppeteer, { Page, Browser } from "puppeteer";


interface IStartBrowser {
    page: Page;
    browser: Browser;
}


const startBrowser = async (url: string): Promise<IStartBrowser> => { console.log('...начало работы--------------------------------------------------------------');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'domcontentloaded'});
    return {
        browser,
        page
    }
}


export default startBrowser;