import { PageInfo } from "./page-info.model";

export class Categories {

    categories: Category[] | null = null;
    pageInfo: PageInfo | null = null;
}

export class Category {

    id: number | undefined;
    name: string | undefined;
    priority: number | undefined;
}