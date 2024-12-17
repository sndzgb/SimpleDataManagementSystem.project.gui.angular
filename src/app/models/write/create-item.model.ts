export class CreateItem {
    private _nazivproizvoda: string | undefined;
    private _opis: string | null | undefined;
    private _datumakcije: string | null | undefined;
    private _retailerId: number | undefined;
    private _cijena: number | undefined;
    private _kategorija: number | undefined;
    private _URLdoslike: File | null | undefined;
    private _isEnabled: boolean | null | undefined;

    private _formData: FormData | undefined;


    nazivproizvoda: string | undefined;
    opis: string | null | undefined;
    datumakcije: string | null | undefined;
    retailerId: number | undefined;
    cijena: number | undefined;
    kategorija: number | undefined;
    URLdoslike: File | null | undefined;
    isEnabled: boolean | null | undefined;

    constructor(init?: Partial<CreateItem>) {
        Object.assign(this, init);
    }

}