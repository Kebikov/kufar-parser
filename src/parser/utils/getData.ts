import path from 'path';
import fsAccessAsync from './fsAccessAsync';
import fsReadFileAcync from './fsReadFileAcync';


 /** `Получение записанных данных.` */
async function getData() { console.log('...получение данных');
    const pathToFile = path.join(__dirname, '..', '..', 'data', 'data.json');
    if(await fsAccessAsync(pathToFile)) {
        return await fsReadFileAcync(pathToFile);
    } else {
        throw new Error('Нет данных для считывания.')
    }
}


export default getData;