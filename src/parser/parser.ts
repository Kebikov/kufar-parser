import path from 'path';
import getData from "./utils/getData";
import fsAccessAsync from "./utils/fsAccessAsync";
import getCollection from "./utils/getCollection";
import writeCollection from "./utils/writeCollection";
import getNewId from "./utils/getAndNewId";
import startBrowser from "./utils/startBrowser";
import TelegramBot from 'node-telegram-bot-api';
import getEnv from '../util/getEnv';
import checkAndCreateFolderData from './utils/checkAndCreateFolderData';


async function parser(url: string) {
    try{
        checkAndCreateFolderData();
        
        const {token, chatId, fromId} = getEnv();
        const bot = new TelegramBot(token);
        
        const {page, browser, chromePath} = await startBrowser(url);

        const currentCollection = await getCollection(page);

        const pathToFile = path.join(__dirname, '..', 'data', 'data.json');

        if(await fsAccessAsync(pathToFile)) {
            const previousCollection = await getData();
            const newId = getNewId(currentCollection, previousCollection);
            if(newId.length > 0) {
                console.log('✅ Есть новые macBooks с id : ', newId);
                console.log('...запись новых данных macBooks');
                await writeCollection([...previousCollection, ...newId]);
                //: отправление в Telegram 
                newId.forEach((item, i) => {
                    bot.sendMessage(chatId, 
                        `<a href="${item.url}">появился новый macBook #${i + 1}</a>`,
                        {parse_mode: 'HTML'}
                    );
                });
            } else {
                console.log('❌ Нет новых macBooks.');
            }
        } else {
            await writeCollection(currentCollection);
        }

        await browser.close();
        console.log('...конец работы');
        return chromePath;
    } catch(err) {
        console.error(err);
        throw new Error('Ошибка в [parser]')
    }
}

export default parser;