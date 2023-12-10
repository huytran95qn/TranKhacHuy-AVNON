import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckBoxOption } from 'src/app/form/models/form.model';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    }
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  public options: CheckBoxOption[] | any = [];

  protected onChanged!: (_value: CheckBoxOption[]) => {};

  protected onTouched!: () => {};

  constructor() { }

  public writeValue(options: CheckBoxOption[]): void {
    this.options = options || [];
  }

  public registerOnChange(fn: (_value: CheckBoxOption[]) => {}): void {
    this.onChanged = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  public onUpdate(option: CheckBoxOption): void {
    if(option.type === 'other') {
      option.additionalValue = '';
    } else {
      this.onChanged(this.options);
    }
  }

  public onUpdateAditionValue(option: CheckBoxOption): void {
    if(option.additionalValue) {
      this.onChanged(this.options);
    }
  }
}
