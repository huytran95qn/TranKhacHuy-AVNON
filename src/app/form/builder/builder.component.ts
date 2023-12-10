import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControlName, FormService } from '../services/form.service';
import { CheckBoxOption, FormModel, TypeFormEnum } from '../models/form.model';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class BuilderComponent {
  public TypeFormEnum = TypeFormEnum;

  public formControlName = FormControlName;

  public items: FormModel[] = [];

  public formGroup: FormGroup = new FormGroup({});

  constructor(
    private formService: FormService,
    private router: Router
  ) {
    this.createFormGroup(formService.getFormBuilders());
  }

  public goToAnswer(): void {
    if(this.formGroup.valid) {
      this.router.navigateByUrl('/form/answers')
    }
  }

  private createFormGroup(items: FormModel[]): void {
    items.forEach(item => {
      let validatorOrOpts = item.required
        ? [Validators.required]
        : [];
      switch (item.type) {
        case TypeFormEnum.Input:
          validatorOrOpts = item.required
            ? [Validators.required]
            : [];
          break;

        case TypeFormEnum.Checkbox:
          validatorOrOpts = item.required
            ? [this.validateCheckbox.bind(this)]
            : [];
          break;
      }

      this.formGroup.addControl(
        item.controlName,
        new FormControl(item.value, validatorOrOpts)
      )
    });
    this.items = items;
    this.updateValue();
  }

  private updateValue(): void {
    this.items.forEach(item => {

      this.formGroup.controls[item.controlName].valueChanges.pipe(
        debounceTime(50)
      ).subscribe((value: string | CheckBoxOption[]) => {
        switch (item.type) {
          case TypeFormEnum.Input:
            this.formService.updateFormBuilderById(item.id, value)
            break;

          case TypeFormEnum.Checkbox:
            this.formService.updateFormBuilderById(item.id, value || [])
            break;
        }
      })
    })
  }

  private validateCheckbox(control: AbstractControl): {[key: string]: any} | null  {
    console.log(control)
    const items = control.value as CheckBoxOption[];
    if(items.length > 0) {
      return items.some(item => item.checked)
        ? null
        : { 'requiredCheckBox': true }
    }
    return null;
  }
}
