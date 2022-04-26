import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordsMustMatchValidator(
  group: AbstractControl
): ValidationErrors | null {
  const password1 = group.get('password1');
  const password2 = group.get('password2');

  return password1?.value !== password2?.value
    ? {
        passwordsMustMatch: true,
      }
    : null;
}
