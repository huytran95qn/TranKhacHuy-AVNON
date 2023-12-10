import { Injectable } from '@angular/core';
import { FormModule } from '../form.module';
import { CheckBoxFormModel, FormModel, InputFormModel, TypeFormEnum } from '../models/form.model';

export enum FormControlName {
  TellUs = 'TellUs',
  Languages = 'Languages'
}

@Injectable({
  providedIn: FormModule
})
export class FormService {
  private builders: FormModel[] = [
    new InputFormModel(
      'Please tell us about yourself',
      true,
      FormControlName.TellUs
    ),
    new CheckBoxFormModel(
      'Please select the languages you know',
      false,
      FormControlName.Languages
    )
  ];

  public getFormBuilders(): FormModel[] {
    return this.builders;
  }

  public updateDataAll(data: FormModel[]): void {
    this.builders = data;
  }

  public updateFormBuilderById(
    id: string,
    value: string | string[],
    additionalValue?: string
  ) {
    let item = this.builders.find(d => d.id === id);
    if(item?.id) {
      switch (item.type) {
        case TypeFormEnum.Input:
          item.value = value;
          break;

        case TypeFormEnum.Checkbox:
          let checkBoxItem = item as CheckBoxFormModel;
          checkBoxItem.value = (value as string[]) || [];
          checkBoxItem.additionalValue = additionalValue;
          break;
      }
    }

    console.log(this.builders)
  }
}
