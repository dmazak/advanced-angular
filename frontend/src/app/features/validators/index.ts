import { AbstractControl, ValidationErrors } from "@angular/forms";

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
