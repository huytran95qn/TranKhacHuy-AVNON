import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormService } from '../services/form.service';
import { FormModel, TypeFormEnum } from '../models/form.model';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswersComponent implements OnInit {
  public builders: FormModel[] = [];

  public typeBuilder = TypeFormEnum;

  constructor(
    formService: FormService
  ) {
    this.builders = formService.getFormBuilders()
  }

  ngOnInit() {
  }

}
