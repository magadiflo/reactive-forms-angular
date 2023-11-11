import { Component, inject, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'advanced-two-person-data',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './advanced-two-person-data.component.html',
  styles: [
  ]
})
export class AdvancedTwoPersonDataComponent implements OnInit {

  @Input({ required: true })
  public title: string = '';

  @Input({ required: true })
  public controlKey: string = '';

  public formGroup!: FormGroup;

  public get parentFormGroup() {
    return this._parentContainer.control?.get(this.controlKey) as FormGroup;
  }

  private _parentContainer = inject(ControlContainer);

  ngOnInit(): void {
    this.formGroup = this.parentFormGroup;
  }

}
