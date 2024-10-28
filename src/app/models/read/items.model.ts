import { PageInfo } from "./page-info.model";

export class Items {

    items: Item[] | null = null;
    pageInfo: PageInfo | null = null;
}

export class Item {

    nazivproizvoda: string | null = null;
    opis: string | null = null;
    cijena: number | null = null;
    // retailerId: number | null = null;
    kategorija: number | null = null;
    datumakcije: string | null = null;
    URLdoslikeUri: string | null = null;
}