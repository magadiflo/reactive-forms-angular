import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { PersonDataComponent } from './person-data/person-data.component';

@Component({
  selector: 'app-middle-page',
  standalone: true,
  imports: [ReactiveFormsModule, PersonDataComponent],
  templateUrl: './middle-page.component.html',
  styles: [
  ]
})
export class MiddlePageComponent {
  private _fb = inject(FormBuilder);

  public form: FormGroup = this._fb.group({
    doYouPayAttentionToClasses: [false],
    doYouSubmitYourAssignmentsOnTime: [false],
    missingClasses: [false],
    dataFather: this._fb.group({
      names: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    }),
    dataMother: this._fb.group({
      names: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    }),
  });

  public saveData(): void {
    console.log(this.form.value);
  }
}
