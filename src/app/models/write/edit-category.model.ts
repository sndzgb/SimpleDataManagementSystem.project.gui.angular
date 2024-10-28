export class EditCategory {
    name: string | undefined;
    priority: number | undefined;

    constructor(init?: Partial<EditCategory>) {
        Object.assign(this, init);
    }
}