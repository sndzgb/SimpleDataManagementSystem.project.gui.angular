export class CreateRetailer {
    name: string | undefined;
    priority: number | undefined;
    logoImage: File | undefined | null;

    constructor(init?: Partial<CreateRetailer>) {
        Object.assign(this, init);
    }
}