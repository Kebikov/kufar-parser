import TelegramBot from 'node-telegram-bot-api';
import processingError from './utils/processingError';
import parser from '../parser/parser';
import getEnv from '../util/getEnv';


process.on('uncaughtException', (error) => {
    processingError(error);
});


let parserInterval: NodeJS.Timeout | null = null;
 /** `Запушен ли парсер.` */
let flagWorkParser: boolean = false;


const startTimeoutParser = ({page, updateMinute}:{page: string, updateMinute: number}) => {
    const ms = updateMinute * 1000 * 60;
    parserInterval = setTimeout(async () => {
        await parser(page);
        startTimeoutParser({page, updateMinute: ms});
    }, ms);
}


const telegramBotKufar = () => {
    try {
        const {token, chatId, fromId, pageForParser} = getEnv();
        const bot = new TelegramBot(token, { polling: true });

        bot.setMyCommands([
            { command: '/start_parser', description: '🚀 Запуск парсинга.' },
            { command: '/stop_parser', description: '❌ Остановка парсинга.'},
            { command: '/check_bot', description: '🔍 Проверка работы бота.'}
        ]);

        bot.onText(/\/start/,async (msg) => {
            try {
                if (msg.from?.id !== Number(fromId)) {
                    bot.sendMessage(msg.chat.id, '❌ Извините, у вас нет доступа.');
                    return;
                }

                if(flagWorkParser) {
                    bot.sendMessage(chatId, '✅ Парсер уже работает!');
                } else {
                    await parser(pageForParser);
                    startTimeoutParser({
                        page: pageForParser,
                        updateMinute: 10
                    });
                    bot.sendMessage(chatId, '🚀 Парсер запушен!');
                    flagWorkParser = true;
                }
            } catch (error) {
                processingError(error);
            }
        });

        bot.onText(/\/stop_parser/, (msg) => {
            try {
                if (msg.from?.id !== Number(fromId)) {
                    bot.sendMessage(msg.chat.id, '❌ Извините, у вас нет доступа.');
                    return;
                }

                if (parserInterval) {
                    clearTimeout(parserInterval);
                    parserInterval = null;
                    flagWorkParser = false;
                    bot.sendMessage(chatId, '❌ Парсер остановлен.');
                } else {
                    bot.sendMessage(chatId, '⚠️ Парсер не работает.');
                }
            } catch (error) {
                processingError(error);
            }
        });


        bot.onText(/\/check_bot/, (msg) => {
            try {
                if (msg.from?.id !== Number(fromId)) {
                    bot.sendMessage(msg.chat.id, '❌ Извините, у вас нет доступа.');
                    return;
                }

                bot.sendMessage(chatId, '🚀 Бот работает!')
            } catch (error) {
                processingError(error);
            }
        });

    } catch (error) {
        processingError(error);
        console.error('Error in [telegramBotKufar] >>>', error);
    }
}


export default telegramBotKufar;