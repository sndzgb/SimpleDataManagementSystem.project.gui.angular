import { AbstractControl, FormControl, FormGroup } from "@angular/forms";

// TODO rename & repurpose - dateMin & dateMax
export const DateInFuture = (control: FormControl) => {

    const date: Date = control.value;

    if (date) {
        let time = new Date();

        const isDateInFuture = (date > time);

        return isDateInFuture ? null : { futureDate: true };
    }

    return null;
}