export class CreateCategory {
    name: string | undefined;
    priority: number | undefined;

    constructor(init?: Partial<CreateCategory>) {
        Object.assign(this, init);
    }
}