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
    //kategorija: number | null = null;
    datumakcije: string | null = null;
    isEnabled: boolean | null = null;
    URLdoslike: string | null = null;

    retailer: Retailer | null = null;
    category: Category | null = null;
    monitoring: MonitoredItem | null = null;
}

export class MonitoredItem {
    totalUsersMonitoringThisItem: number | undefined;
    isMonitoredByCurrentUser: boolean | undefined;
}

export class Retailer {
    id: number | undefined;
    name: string | undefined;
    priority: number | undefined;
}

export class Category {
    id: number | undefined;
    name: string | undefined;
}