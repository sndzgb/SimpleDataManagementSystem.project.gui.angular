export class EditItem {

    constructor(init?: Partial<EditItem>) {
        Object.assign(this, init);
    }

    private _opis: string | null = null;
    private _datumakcije: string | null = null;
    private _retailerId: number | null = null;
    private _cijena: number | null = null;
    private _kategorija: number | null = null;
    private _URLdoslike: File | any;

    get opis(): string | null{
        return this._opis || null;
    }

    set opis(opis: string | null) {
        this._opis = opis;
    }

    get datumakcije(): string {
        return this._datumakcije!;
    }

    set datumakcije(datumakcije: string) {
        this._datumakcije = datumakcije;
    }

    get URLdoslike(): File { // | null {
        return this._URLdoslike;
    }

    set URLdoslike(file: File | any) {
        this._URLdoslike = file;
    }

    get cijena(): number {
        return this._cijena!;
    }

    set cijena(cijena: number) {
        this._cijena = cijena;
    }

    get kategorija(): number {
        return this._kategorija!;
    }

    set kategorija(kategorija: number) {
        this._kategorija = kategorija;
    }

    get retailerId(): number {
        return this._retailerId!;
    }

    set retailerId(retailerId: number) {
        this._retailerId = retailerId;
    }
}