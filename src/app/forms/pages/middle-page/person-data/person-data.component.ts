import { Component, Input, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-person-data',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './person-data.component.html',
  styles: [
  ]
})
export class PersonDataComponent {

  @Input({ required: true })
  public title: string = '';
  private _formBuilder = inject(NonNullableFormBuilder);

  public form: FormGroup = this._formBuilder.group({
    names: ['', [Validators.required]],
    lastName: ['', [Validators.required]]
  });

}
