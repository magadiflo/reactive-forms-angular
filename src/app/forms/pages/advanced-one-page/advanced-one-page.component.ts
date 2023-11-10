import { Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

import { IPersonData, IStudentAdvancedOneForm } from 'src/app/model/person-data.model';
import { PersonDataComponent } from './person-data/person-data.component';
import { getFormControlValueAsType } from './util/functions-form';

@Component({
  selector: 'app-advanced-one-page',
  standalone: true,
  imports: [ReactiveFormsModule, PersonDataComponent],
  templateUrl: './advanced-one-page.component.html',
  styles: [
  ]
})
export class AdvancedOnePageComponent {
  private _fb = inject(NonNullableFormBuilder);

  public form: FormGroup = this._fb.group<IStudentAdvancedOneForm>({
    doYouPayAttentionToClasses: this._fb.control(false),
    doYouSubmitYourAssignmentsOnTime: this._fb.control(false),
    missingClasses: this._fb.control(false),
  });

  public saveData(): void {
    console.log(this.form.value);
    console.log(this.form.controls['dataFather'].value);
    console.log(this.form.get('dataFather')?.value);

    const data = getFormControlValueAsType<IPersonData>(this.form, 'dataFather');
    console.log(data);
  }
}
