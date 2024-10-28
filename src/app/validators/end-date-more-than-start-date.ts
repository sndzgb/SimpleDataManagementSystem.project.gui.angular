import { FormGroup } from "@angular/forms";

export const EndDateMoreThanStartDate = (formGroup: FormGroup) => {

    const start: Date = formGroup.get("startsAt")?.value;
    const end: Date = formGroup.get("endsAt")?.value;

    if (start && end) {
        const isRangeValid = (end.getTime() - start.getTime() > 0);

        return isRangeValid ? null : { dateRange: true };
    }

    return null;
}