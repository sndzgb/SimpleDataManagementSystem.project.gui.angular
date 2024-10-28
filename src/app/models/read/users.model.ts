import { PageInfo } from "./page-info.model";

export class Users {

    users: User[] | null = null;
    pageInfo: PageInfo | null = null;
}

export class User {

    id: number | null = null;
    username: string | null = null;
    roleName: string | null = null;
    isPasswordChangeRequired: boolean | null = null;
}