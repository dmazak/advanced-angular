import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function disallowedDomainValidator(domain: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value.match(domain) ? { disallowedDomain: domain } : null;
  };
}
