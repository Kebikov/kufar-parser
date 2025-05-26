import type { ICollection } from "./getCollection";

 /** `Получение новых MacBooks` */
const getNewId = (currentCollection: ICollection[], previousCollection: ICollection[]): ICollection[] => { console.log('...Получение новых MacBooks');
    const newCollection: ICollection[] = [];
    currentCollection.forEach(currentItem => {
        const index = previousCollection.findIndex(prevItem => prevItem.id === currentItem.id);
        if(index === -1) {
            newCollection.push(currentItem);
        }
    });
    return newCollection;
}


export default getNewId;