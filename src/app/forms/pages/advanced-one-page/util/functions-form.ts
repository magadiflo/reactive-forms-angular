import { FormGroup } from "@angular/forms";

export const getFormControlValueAsType = <T>(formGroup: FormGroup, controlName: string): T | null => {
  const control = formGroup.get(controlName);
  return control ? control.value as T : null;
}
