import { PageInfo } from "./page-info.model";

export class Users {

    users: User[] | null = null;
    pageInfo: PageInfo | null = null;
}

export class User {

    // id: number | null = null;
    // username: string | null = null;
    // roleName: string | null = null;
    // isPasswordChangeRequired: boolean | null = null;

    id: number | undefined;
    username: string | undefined;
    isPasswordChangeRequired: boolean | undefined;
    createdUTC: Date | undefined;

    role: Role | undefined;
}

export class Role {
    id: number | undefined;
    name: string | undefined;
}