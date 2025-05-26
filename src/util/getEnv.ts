import processingError from "../telegram/utils/processingError";
import dotenv from 'dotenv';
dotenv.config();

const getEnv = () => {
    try {
        const token = process.env.TELEGRAM_TOKEN;
        const chatId = process.env.CHAT_ID;
        const fromId = process.env.FROM_ID;
        const pageForParser = process.env.PAGE_FOR_PARSER;
        if(!token || !chatId || !fromId || !pageForParser) throw new Error('❌ Не получены данные из .env');
        return {
            token,
            chatId, 
            fromId,
            pageForParser
        }
    } catch (error) {
        processingError(error);
        throw new Error('Ошибка в [getEnv].');
    }
}


export default getEnv;