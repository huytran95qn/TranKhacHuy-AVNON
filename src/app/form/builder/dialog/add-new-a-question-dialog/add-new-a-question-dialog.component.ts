import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { InputFormModel, TypeFormEnum } from '../../../models/form.model';

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

  constructor(
    private _dialogRef: MatDialogRef<AddNewAQuestionDialogComponent>,
  ) { }

  public selectType(type: TypeFormEnum): void {
    this.typeQuestion = type;
  }

  public onSubmit(): void {
    if(this.typeQuestion && this.descriptionQuestion) {
      switch (this.typeQuestion) {
        case TypeFormEnum.Input:
          let newInputQuestion = new InputFormModel(
            this.descriptionQuestion,
            this.fieldRequired
          );
          this._dialogRef.close(newInputQuestion);
          break;

        case TypeFormEnum.Checkbox:
          // let newCheckboxQuestion = new InputFormModel(
          //   this.descriptionQuestion,
          //   this.fieldRequired
          // );
          // this._formService.addItemToFormBuilder(newInputQuestion);
          break;
      }
    }
  }
}
