import { Component, Input, OnInit, inject } from '@angular/core';
import { ControlContainer, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { IPersonDataForm } from 'src/app/model/person-data.model';

@Component({
  selector: 'advanced-person-data',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './person-data.component.html',
  styles: [],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ]
})
export class PersonDataComponent implements OnInit {

  private _formBuilder = inject(NonNullableFormBuilder);
  private _parentContainer = inject(ControlContainer);

  @Input({ required: true })
  public title: string = '';

  @Input({ required: true })
  public formGroupName: string = '';

  public get parentFormGroup(): FormGroup {
    return this._parentContainer.control as FormGroup;
  }

  public get formGroupChild(): FormGroup<IPersonDataForm> {
    return this._formBuilder.group<IPersonDataForm>({
      names: this._formBuilder.control('', { validators: [Validators.required] }),
      lastName: this._formBuilder.control('', { validators: [Validators.required] }),
    });
  }

  ngOnInit(): void {
    this.parentFormGroup.addControl(this.formGroupName, this.formGroupChild);
  }

}

