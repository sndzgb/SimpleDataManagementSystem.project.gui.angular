export class EditRetailer {
    name: string | undefined;
    priority: number | undefined;
    logoImage: File | null | undefined;

    constructor(init?: Partial<EditRetailer>) {
        Object.assign(this, init);
    }
}