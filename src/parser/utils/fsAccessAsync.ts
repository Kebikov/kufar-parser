import fs from 'fs';

 /** `Сушествует ли переданный путь.` */
const accessToDataFile = async (pathToFile: string): Promise<boolean> => {
    
    return new Promise((resolve, reject) => {
        fs.access(pathToFile, (err) => {
            err ? resolve(false) : resolve(true);
        })
    })
}


export default accessToDataFile;