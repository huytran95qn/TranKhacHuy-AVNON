import { v4 as uuid } from 'uuid';

export enum TypeFormEnum {
  Input = 1,
  Checkbox
}

export interface CommonFormModel {
  id: string;
  type: TypeFormEnum;
  title: string;
  required: boolean;
}

export class InputFormModel implements CommonFormModel {
  readonly type: TypeFormEnum = TypeFormEnum.Input;
  id!: string;
  title!: string;
  required!: boolean;
  value?: string;

  constructor(title: string, required: boolean, value?: string) {
    this.id = uuid();
    this.title = title;
    this.required = required;
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
  value: CheckBoxOption[] = [];

  constructor(title: string, required: boolean, value?: CheckBoxOption[]) {
    this.id = uuid();
    this.title = title;
    this.required = required;
    this.value = value || [];
  }
}

export type FormModel = InputFormModel | CheckBoxFormModel;
