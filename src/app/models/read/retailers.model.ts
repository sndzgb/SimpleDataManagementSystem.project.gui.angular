import { PageInfo } from "./page-info.model";

export class Retailers {

    constructor() {
        this.retailers = [];
        this.pageInfo = new PageInfo();
    }

    retailers: Retailer[] | null; // | null = null;
    pageInfo: PageInfo | null; // = null;
}

export class Retailer {

    id: number | undefined;
    name: string | undefined;
    priority: number | undefined;
    logoImageUrl: string | undefined;
}