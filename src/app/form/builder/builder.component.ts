import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControlName, FormService } from '../services/form.service';
import { CheckBoxOption, FormModel, InputFormModel, TypeFormEnum } from '../models/form.model';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddNewAQuestionDialogComponent } from './dialog/add-new-a-question-dialog/add-new-a-question-dialog.component';

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
    private router: Router,
    public dialog: MatDialog
  ) {
    this.createFormGroup(formService.getFormBuilders());
  }

  public goToAnswer(): void {
    this.router.navigateByUrl('/form/answers');
  }

  public addNewQuestion(): void {
    const dialogRef = this.dialog.open(AddNewAQuestionDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().pipe(
      filter(v => !!v)
    ).subscribe((question: InputFormModel) => {
      this.addFormControl(question);
      this.formGroup.controls[question.id].valueChanges.pipe(
        debounceTime(50)
      ).subscribe((value: string | CheckBoxOption[]) => {
        switch (question.type) {
          case TypeFormEnum.Input:
            this.formService.updateFormBuilderById(question.id, value)
            break;

          case TypeFormEnum.Checkbox:
            this.formService.updateFormBuilderById(question.id, value || [])
            break;
        }
      });

      this.formService.addItemToFormBuilder(question);
    });
  }

  private createFormGroup(items: FormModel[]): void {
    items.forEach(item => this.addFormControl(item));
    this.items = items;
    this.updateValue();
  }

  private addFormControl(item: FormModel): void {
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
        item.id,
        new FormControl(item.value, validatorOrOpts)
      )
  }

  private updateValue(): void {
    this.items.forEach(item => {

      this.formGroup.controls[item.id].valueChanges.pipe(
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
