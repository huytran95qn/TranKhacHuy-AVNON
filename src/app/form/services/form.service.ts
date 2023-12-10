import { Injectable } from '@angular/core';
import { FormModule } from '../form.module';
import { CheckBoxFormModel, CheckBoxOption, FormModel, InputFormModel, TypeFormEnum } from '../models/form.model';

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
    ),
    new CheckBoxFormModel(
      'Please select the languages you know',
      true,
      [
        new CheckBoxOption('Typescript'),
        new CheckBoxOption('Python'),
        new CheckBoxOption('C#'),
        new CheckBoxOption('Other', 'other')
      ]
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
    value: string | CheckBoxOption[],
  ) {
    let item = this.builders.find(d => d.id === id);
    if(item?.id) {
      item.value = value;
    }

    console.log(this.builders)
  }

  public addItemToFormBuilder(
    data: InputFormModel | CheckBoxFormModel
  ): void {
    this.builders.push(data);
  }
}
