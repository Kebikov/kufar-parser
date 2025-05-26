import fs from 'fs';
import path from 'path';

 /** `Проверка сушествования папки [data], если нет создание ее.` */
const checkAndCreateFolderData = () => {
    const pathFolder = path.join(__dirname, '..', '..', 'data');

    if(fs.existsSync(pathFolder)) {
        console.log('...папка data уже есть', pathFolder);
    } else {
        fs.mkdirSync(pathFolder);
        console.log('...папка data создана', pathFolder);
    }
}


export default checkAndCreateFolderData;