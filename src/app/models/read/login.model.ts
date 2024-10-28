export class Login {
    public username: string | null = null;
    password: string | null = null;

    constructor(init?: Partial<Login>) {
        Object.assign(this, init);
    }
}