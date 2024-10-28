export class EditUser {
    roleId: number | null = null;
    username: string | null = null;

    constructor(init?: Partial<EditUser>) {
        Object.assign(this, init);
    }
}