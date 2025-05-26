import TelegramBot from 'node-telegram-bot-api';


const processingError = (error: any) => {
    const token = process.env.TELEGRAM_TOKEN;
    const chatId = process.env.CHAT_ID;
    if(token !== undefined && chatId !== undefined) {
        const bot = new TelegramBot(token);
        bot.sendMessage(chatId, `❌ Ошибка в @kufar_macBook_bot:\n${error}`);
    }
}


export default processingError;
