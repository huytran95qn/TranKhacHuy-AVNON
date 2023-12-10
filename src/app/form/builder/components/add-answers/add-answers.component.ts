import { ChangeDetectionStrategy, Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormArray, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-add-answers',
  templateUrl: './add-answers.component.html',
  styleUrls: ['./add-answers.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddAnswersComponent),
      multi: true,
    }
  ],
})
export class AddAnswersComponent implements ControlValueAccessor, OnInit {
  @Input('disabled') set setDisabled(disabled: boolean) {
    if(disabled) {
      this.formArrayAnswers.disable({emitEvent: false});
    } else {
      this.formArrayAnswers.enable({emitEvent: false})
    }

    this.disabled = disabled;
  }

  public disabled: boolean = false

  public formArrayAnswers: FormArray<FormControl<string>> = new FormArray<FormControl<string>>([]);

  protected onChanged!: (_value: string[]) => {};

  protected onTouched!: () => {};

  public writeValue(answers: string[]): void {
    answers = answers || [];
    this.createFormArray(answers);
  }

  public registerOnChange(fn: (_value: string[]) => {}): void {
    this.onChanged = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if(isDisabled) {
      this.formArrayAnswers.disable({emitEvent: false});
    } else {
      this.formArrayAnswers.enable({emitEvent: false})
    }
  }

  public ngOnInit(): void {
    this.formArrayAnswers.valueChanges.pipe(
      debounceTime(300)
    ).subscribe((answers: string[]) => {
      this.onChanged(answers);
      this.onTouched()
    })
  }

  public addAnotherAnswer(): void {
    if(this.formArrayAnswers.length <= 4) {
      const control = new FormControl<string>('') as FormControl<string>;
      this.formArrayAnswers.push(control);
    }
  }

  private createFormArray(answers: string[]) {
    answers.forEach(answer => {
      const control = new FormControl<string>(answer) as FormControl<string>;
      this.formArrayAnswers.push(control);
    });
  }
}
