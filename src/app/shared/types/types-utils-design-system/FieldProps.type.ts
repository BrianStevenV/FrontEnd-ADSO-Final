import { ValidatorFn } from "@angular/forms";

export interface Field {
    nameLabel: string;
    formControlName: string;
    inputType: string;
    validators?: ValidatorFn[];
    maxLength?: number;
    options?: { value: any; label: string }[];
}