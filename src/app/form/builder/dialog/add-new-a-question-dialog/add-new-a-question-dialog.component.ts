import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CheckBoxFormModel, CheckBoxOption, InputFormModel, TypeFormEnum } from '../../../models/form.model';

@Component({
  selector: 'app-add-new-a-question-dialog',
  templateUrl: './add-new-a-question-dialog.component.html',
  styleUrls: ['./add-new-a-question-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AddNewAQuestionDialogComponent {
  public typeQuestion!: TypeFormEnum;

  public descriptionQuestion: string = '';

  public typeFormEnum = TypeFormEnum;

  public hasOwnAnswer: boolean = false;

  public fieldRequired: boolean = false;

  public answerQuestions: string[] = ['', ''];

  constructor(
    private _dialogRef: MatDialogRef<AddNewAQuestionDialogComponent>,
  ) { }

  public selectType(type: TypeFormEnum): void {
    this.typeQuestion = type;
  }

  public allowSubmitStatus(): boolean {
    if(this.descriptionQuestion) {
      switch (this.typeQuestion) {
        case TypeFormEnum.Input:
          return true;

        case TypeFormEnum.Checkbox:
          return this.answerQuestions.some(q => !!q);

        default:
          return false;
      }
    }

    return false;
  }

  public onSubmit(): void {
    if(this.allowSubmitStatus()) {
      switch (this.typeQuestion) {
        case TypeFormEnum.Input:
          let newInputQuestion = new InputFormModel(
            this.descriptionQuestion,
            this.fieldRequired
          );
          this._dialogRef.close(newInputQuestion);
          break;

        case TypeFormEnum.Checkbox:
          let options = this.answerQuestions.reduce((llist, curr) => {
            llist.push(new CheckBoxOption(curr, 'normal'))
            return llist;
          }, [] as CheckBoxOption[]);
          if(this.hasOwnAnswer) {
            options.push(new CheckBoxOption('Other', 'other'))
          }
          let newCheckboxQuestion = new CheckBoxFormModel(
            this.descriptionQuestion,
            this.fieldRequired,
            options
          );
          this._dialogRef.close(newCheckboxQuestion);
          break;
      }
    }
  }
}
