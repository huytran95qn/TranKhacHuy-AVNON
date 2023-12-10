import { v4 as uuid } from 'uuid';

export enum TypeFormEnum {
  Input,
  Checkbox
}

export interface CommonFormModel {
  id: string;
  type: TypeFormEnum;
  title: string;
  required: boolean;
  controlName: string;
}

export class InputFormModel implements CommonFormModel {
  readonly type: TypeFormEnum = TypeFormEnum.Input;
  id!: string;
  title!: string;
  required!: boolean;
  controlName!: string
  value?: string;

  constructor(title: string, required: boolean, controlName: string, value?: string) {
    this.id = uuid();
    this.title = title;
    this.required = required;
    this.controlName = controlName;
    this.value = value
  }
}

export class CheckBoxOption {
  id!: string;
  type: 'normal' | 'other' = 'normal'
  title!: string;
  checked: boolean = false;
  additionalValue: string = '';

  constructor(title: string, type: 'normal' | 'other' = 'normal') {
    this.id = uuid();
    this.title = title;
    this.type = type;
  }
}
export class CheckBoxFormModel implements CommonFormModel {
  readonly type: TypeFormEnum = TypeFormEnum.Checkbox;
  id!: string;
  title!: string;
  required: boolean = false;
  controlName!: string;
  value: CheckBoxOption[] = [];

  constructor(title: string, required: boolean, controlName: string, value?: CheckBoxOption[]) {
    this.id = uuid();
    this.title = title;
    this.required = required;
    this.controlName = controlName;
    this.value = value || [];
  }
}

export type FormModel = InputFormModel | CheckBoxFormModel;
