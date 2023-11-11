import { Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { IStudentAdvancedTwoForm } from 'src/app/model/person-data.model';
import { AdvancedTwoPersonDataComponent } from './advanced-two-person-data/advanced-two-person-data.component';

@Component({
  selector: 'app-advanced-two-page',
  standalone: true,
  imports: [ReactiveFormsModule, AdvancedTwoPersonDataComponent],
  templateUrl: './advanced-two-page.component.html',
  styles: [
  ]
})
export class AdvancedTwoPageComponent {
  private _fb = inject(NonNullableFormBuilder);

  public form: FormGroup = this._fb.group<IStudentAdvancedTwoForm>({
    doYouPayAttentionToClasses: this._fb.control(false),
    doYouSubmitYourAssignmentsOnTime: this._fb.control(false),
    missingClasses: this._fb.control(false),
    dataFather: this._fb.group({
      names: this._fb.control('', { validators: [Validators.required] }),
      lastName: this._fb.control('', { validators: [Validators.required] }),
    }),
    dataMother: this._fb.group({
      names: this._fb.control('', { validators: [Validators.required] }),
      lastName: this._fb.control('', { validators: [Validators.required] }),
    }),
  });

  public saveData(): void {
    console.log(this.form.value);
  }
}
