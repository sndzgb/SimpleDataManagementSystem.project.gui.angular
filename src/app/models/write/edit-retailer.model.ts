export class EditRetailer {
    name: string | undefined;
    priority: number | undefined;
    logoImage: File | null | undefined;
    deleteCurrentLogoImage: boolean | undefined;

    constructor(init?: Partial<EditRetailer>) {
        Object.assign(this, init);
    }
}