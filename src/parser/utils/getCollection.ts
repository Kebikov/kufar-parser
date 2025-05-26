import {Page} from "puppeteer";


export interface ICollection {
    id: string;
    url: string;
}



// https://www.kufar.by/item/1017254580?r_block=all&amp;rank=0&amp;searchId=65927a319c3b44d398c6ad2353ae91ae3618


async function getCollection(page: Page): Promise<ICollection[]> { console.log('...cбор id');
    return await page.evaluate(() => {
        const dataNameListings = document.querySelector('[data-name="listings"]');
        if(!dataNameListings) throw new Error('Нет [data-name="listings"]');
        const elementsSections = dataNameListings.querySelectorAll('section') as NodeListOf<HTMLElement>;
        const collection: ICollection[] = [];
        elementsSections.forEach(item => {
            const elementA = item.querySelector('a');
            if(elementA && elementA.hasAttribute('href')) {
                const href = elementA.getAttribute('href') as string;
                const mainPartUrl = href.split('?r_block')[0];
                const id = mainPartUrl.split('/item/')[1];
                if(id) {
                    collection.push({
                        id,
                        url: href
                    })
                }
            }
        });
        return collection;
    });
}

export default getCollection;