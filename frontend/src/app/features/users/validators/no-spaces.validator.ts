import { AbstractControl, ValidationErrors } from '@angular/forms';

// custom validator for no spaces in username
export function noSpaceValidator(
  control: AbstractControl
): ValidationErrors | null {
  const re = /^\S*$/;

  if (!re.test(control.value)) {
    return {
      noSpaces: true,
    };
  } else {
    return null;
  }
}
