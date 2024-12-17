import { PageInfo } from "./page-info.model";

export class Roles {
    roles: Role[] | undefined;
    pageInfo: PageInfo | undefined;
}

export class Role {
    id: number | undefined;
    name: string | undefined;
}