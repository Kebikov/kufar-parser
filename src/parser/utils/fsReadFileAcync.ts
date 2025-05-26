import fs from 'fs';
import type { ICollection } from './getCollection';


async function fsReadFileAcync(pathToFile: string): Promise<ICollection[]> {

    return new Promise((resolve, reject) => {
        fs.readFile(pathToFile, (err, data) => {
            if(err) {
                reject(err.message);
            } else {
                resolve(JSON.parse(data.toString()));
            }
        });
    });
}


export default fsReadFileAcync;