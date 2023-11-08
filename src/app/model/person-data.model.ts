import { FormControl } from "@angular/forms";

export interface IPersonDataForm {
  names: FormControl<string>;
  lastName: FormControl<string>;
}

export interface IPersonData {
  names: string;
  lastName: string;
}

// Usado en el middle-page
export interface IStudentForm {
  doYouPayAttentionToClasses: FormControl<boolean>;
  doYouSubmitYourAssignmentsOnTime: FormControl<boolean>;
  missingClasses: FormControl<boolean>;
  dataFather: FormControl<IPersonData | null>;
  dataMother: FormControl<IPersonData | null>;
}
