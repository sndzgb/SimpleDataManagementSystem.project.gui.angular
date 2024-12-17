export class ItemDetails {

    item: Item | undefined;
    mointoring: MonitoredItem | undefined;

    // nazivproizvoda: string | undefined;
    // opis: string | null = null;
    // cijena: number | null = null;
    // datumakcije: string | null = null;
    // URLdoslikeUri: string | null = null;
    // retailerId: number | null = null;
    // nazivretailera: string | null = null;
    // kategorija: number | null = null;


}

export class MonitoredItem {
    totalUsersMonitoringThisItem: number | undefined;
    isMonitoredByUser: boolean | undefined;
    startedMonitoringAtUtc: Date | undefined;
}

export class Item {
    nazivproizvoda: string | undefined;
    opis: string | null = null;
    cijena: number | null = null;
    datumakcije: string | null = null;
    URLdoslike: string | null = null;
    nazivretailera: string | null = null;
    isEnabled: boolean | null = null;

    category: Category | null = null;
    retailer: Retailer | null = null;
}

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