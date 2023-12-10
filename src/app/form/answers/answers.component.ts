import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormService } from '../services/form.service';
import { CheckBoxOption, FormModel, TypeFormEnum } from '../models/form.model';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AnswersComponent {
  public builders: FormModel[] = [];

  public typeBuilder = TypeFormEnum;

  constructor(
    formService: FormService
  ) {
    this.builders = formService.getFormBuilders()
  }

  public filterOptions(options: CheckBoxOption[]): CheckBoxOption[] {
    return options.filter(o => o.checked);
  }
}
