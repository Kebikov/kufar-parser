import telegramBotKufar from "./telegram/bot";
import express, {Request, Response} from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot is working!');
});

app.listen(PORT, () => {
    console.log(`Dummy server listening on port ${PORT}`);
});

telegramBotKufar();