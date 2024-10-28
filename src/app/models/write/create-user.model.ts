export class CreateUser {
    username: string | undefined;
    password: string | undefined;
    roleId: number | undefined;

    constructor(init?: Partial<CreateUser>) {
        Object.assign(this, init);
    }
}