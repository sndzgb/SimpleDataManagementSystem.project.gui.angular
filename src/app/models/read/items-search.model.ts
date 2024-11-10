import { PageInfo } from "./page-info.model";

export class ItemsSearchRequest {

    constructor(init?: Partial<ItemsSearchRequest>) {
        Object.assign(this, init);
    }

    sortBy: SortableItem = SortableItem.nazivproizvodaAsc;
    searchQuery: string | null = "";
    page: number | null = 1;
    take: number | null = 8;
}

export class ItemsSearchResponse {
    items: ItemsSearchResult[] | null = null;
    request: ItemsSearchRequest | null = null;
    pageInfo: PageInfo | null = null;
}

export class ItemsSearchResult {
    nazivproizvoda: string | null = null;
    cijena: number | null = null;
    URLdoslikeUri: string | null = null;
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