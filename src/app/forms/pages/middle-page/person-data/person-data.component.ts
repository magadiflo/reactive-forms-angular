import { Component, Input, inject, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validator, Validators } from '@angular/forms';

import { IPersonData, IPersonDataForm } from '../../../../model/person-data.model';

@Component({
  selector: 'app-person-data',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './person-data.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PersonDataComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PersonDataComponent),
      multi: true,
    }
  ],
})
export class PersonDataComponent implements ControlValueAccessor, Validator {

  private _formBuilder = inject(NonNullableFormBuilder);

  private _onChanged: Function = (_value: { names: string; lastName: string; }) => { };
  private _onTouch: Function = (_value: { names: string; lastName: string; }) => { };

  @Input({ required: true })
  public title: string = '';

  public form: FormGroup = this._formBuilder.group<IPersonDataForm>({
    names: this._formBuilder.control('', { validators: [Validators.required] }),
    lastName: this._formBuilder.control('', { validators: [Validators.required] }),
  });

  constructor() {
    this.form.valueChanges
      .subscribe(() => {
        const value = this.form.value;
        this._onChanged(value);
        this._onTouch(value);
      });
  }

  // ControlValueAccessor --------------------------------------------------------
  writeValue(obj: IPersonData): void {
    if (obj) {
      this.form.setValue(obj);
    }
  }

  registerOnChange(fn: Function): void {
    this._onChanged = fn;
  }

  registerOnTouched(fn: Function): void {
    this._onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  // Validator  ------------------------------------------------------------------
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.form.valid ? null : { personData: true };
  }

  registerOnValidatorChange?(fn: () => void): void {
    this._onChanged = fn;
  }

}
