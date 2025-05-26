import puppeteer, { Page, Browser } from "puppeteer";


interface IStartBrowser {
    page: Page;
    browser: Browser;
    chromePath: string;
}


const startBrowser = async (url: string): Promise<IStartBrowser> => { console.log('...начало работы--------------------------------------------------------------');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Узнаем путь к исполняемому файлу браузера
    const browserProcess = browser.process();
    const chromePath = browserProcess?.spawnfile || '❌ Путь к "Google Chrome" не найден.';
    console.log('Путь к браузеру:', browserProcess?.spawnfile);

    await page.goto(url, {waitUntil: 'domcontentloaded'});
    return {
        browser,
        page, 
        chromePath
    }
}


export default startBrowser;