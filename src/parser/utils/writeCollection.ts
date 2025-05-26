import fs from 'fs';
import path from 'path';
import type { ICollection } from "./getCollection";


async function writeCollection(collectionId: ICollection[]) {
    console.log('...зипись данных');
    const pathToFile = path.join(__dirname, '..', '..', 'data', 'data.json');
    fs.writeFile(pathToFile, JSON.stringify(collectionId), (err) => {
        err ? console.log('Ошибка при записи файла:', err) : console.log('Файл записан!');
    });
}


export default writeCollection;