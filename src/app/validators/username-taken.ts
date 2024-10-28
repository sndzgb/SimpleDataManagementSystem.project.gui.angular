import { AbstractControl, FormControl } from "@angular/forms"

export const UsernameTaken = (control: AbstractControl) => {

    return IsUsernameTaken(control.value);
}

function IsUsernameTaken(username: string) : Promise<any> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (true) {
                resolve( { isUsernameTaken: true} );
            } else {
                resolve(null);
            }
        }, 1500)
    });
}