import { FormControl } from "@angular/forms";

export class SimpleDataManagementSystemValidators {

    static PasswordStrengthValidator(control: FormControl) {

        const value = control.value;

        if (!value) {
            return null;
        }

        const hasUpperCase = /[A-Z]+/.test(value);

        const hasLowerCase = /[a-z]+/.test(value);

        const hasNumeric = /[0-9]+/.test(value);

        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

        return !passwordValid ? { passwordStrength: true }: null;
    }
}