import { PageInfo } from "./page-info.model";

export class ItemsSearchRequest {

    constructor(init?: Partial<ItemsSearchRequest>) {
        Object.assign(this, init);
    }

    sortBy: SortableItem = SortableItem.nazivproizvodaAsc;
    query: string | null = "";
    page: number | null = 1;
    take: number | null = 8;
}

export class ItemsSearchResponse {
    items: ItemsSearchResult[] | null = null;
    
    // request: ItemsSearchRequest | null = null;
    pageInfo: PageInfo | null = null;
}

export class ItemsSearchResult {

    nazivproizvoda: string | undefined;
    opis: string | null = null;
    cijena: number | null = null;
    datumakcije: string | null = null;
    URLdoslike: string | null = null;
    nazivretailera: string | null = null;

    category: Category | null = null;
    retailer: Retailer | null = null;

    totalUsersMonitoringThisItem: number | undefined;
    isMonitoredByUser: boolean | undefined;

    // nazivproizvoda: string | null = null;
    // cijena: number | null = null;
    // URLdoslikeUri: string | null = null;
}

// export class Item {
//     nazivproizvoda: string | undefined;
//     opis: string | null = null;
//     cijena: number | null = null;
//     datumakcije: string | null = null;
//     URLdoslike: string | null = null;
//     nazivretailera: string | null = null;

//     category: Category | null = null;
//     retailer: Retailer | null = null;

//     totalUsersMonitoringThisItem: number | undefined;
//     isMonitoredByUser: boolean | undefined;
// }

export class Retailer {
    id: number | undefined;
    name: string | undefined;
    priority: number | undefined;
    logoImageUrl: string | undefined;
}

export class Category {
    id: number | undefined;
    name: string | undefined;
    priority: number | undefined;
}

export enum SortableItem {
    nazivproizvodaAsc = 10,
    nazivproizvodaDesc = 11,
    cijenaAsc = 20,
    cijenaDesc = 21
}

export const SortableItemIntoLabelMapping: Record<SortableItem, string> = {
    [SortableItem.nazivproizvodaAsc]: "Naziv proizvoda asc",
    [SortableItem.nazivproizvodaDesc]: "Naziv proizvoda desc",
    [SortableItem.cijenaAsc]: "Cijena asc",
    [SortableItem.cijenaDesc]: "Cijena desc",
};