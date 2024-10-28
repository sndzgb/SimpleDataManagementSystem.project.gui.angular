export class UpdatePassword {
    
    oldpassword: string | null = null;
    newpassword: string | null = null;

    constructor(init?: Partial<UpdatePassword>) {
        Object.assign(this, init);
    }
}