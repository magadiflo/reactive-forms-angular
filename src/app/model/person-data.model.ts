import { FormControl, FormGroup } from "@angular/forms";

export interface IPersonDataForm {
  names: FormControl<string>;
  lastName: FormControl<string>;
}

export interface IPersonData {
  names: string;
  lastName: string;
}

// Usado en middle-page
export interface IStudentForm {
  doYouPayAttentionToClasses: FormControl<boolean>;
  doYouSubmitYourAssignmentsOnTime: FormControl<boolean>;
  missingClasses: FormControl<boolean>;
  dataFather: FormControl<IPersonData | null>;
  dataMother: FormControl<IPersonData | null>;
}

// Usado en advanced-one-page
export interface IStudentAdvancedOneForm {
  doYouPayAttentionToClasses: FormControl<boolean>;
  doYouSubmitYourAssignmentsOnTime: FormControl<boolean>;
  missingClasses: FormControl<boolean>;
}

// Usado en advanced-two-page
export interface IStudentAdvancedTwoForm {
  doYouPayAttentionToClasses: FormControl<boolean>;
  doYouSubmitYourAssignmentsOnTime: FormControl<boolean>;
  missingClasses: FormControl<boolean>;
  dataFather: FormGroup<IPersonDataForm>;
  dataMother: FormGroup<IPersonDataForm>;
}
