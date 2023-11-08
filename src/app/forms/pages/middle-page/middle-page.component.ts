import { Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { PersonDataComponent } from './person-data/person-data.component';
import { IStudentForm } from 'src/app/model/person-data.model';

@Component({
  selector: 'app-middle-page',
  standalone: true,
  imports: [ReactiveFormsModule, PersonDataComponent],
  templateUrl: './middle-page.component.html',
  styles: [
  ]
})
export class MiddlePageComponent {
  private _fb = inject(NonNullableFormBuilder);

  public form: FormGroup = this._fb.group<IStudentForm>({
    doYouPayAttentionToClasses: this._fb.control(false),
    doYouSubmitYourAssignmentsOnTime: this._fb.control(false),
    missingClasses: this._fb.control(false),
    dataFather: this._fb.control(null, { validators: [Validators.required] }),
    dataMother: this._fb.control({ value: null, disabled: true }, { validators: [Validators.required] }),
  });

  public saveData(): void {
    console.log(this.form.value);
  }
}
