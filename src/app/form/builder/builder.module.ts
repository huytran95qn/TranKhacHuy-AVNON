import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderComponent } from './builder.component';
import { BuilderRoutingModule } from './builder-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { AddNewAQuestionDialogComponent } from './dialog/add-new-a-question-dialog/add-new-a-question-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddAnswersComponent } from './components/add-answers/add-answers.component';

const ANGULAR_MATERIALS = [
  MatInputModule,
  MatCheckboxModule,
  MatDialogModule
];

const COMPONENTS = [
  BuilderComponent,
  CheckboxComponent,
  AddAnswersComponent
];

const DIALOGS = [
  AddNewAQuestionDialogComponent
]

@NgModule({
  imports: [
    CommonModule,
    BuilderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...ANGULAR_MATERIALS
  ],
  declarations: [
    ...COMPONENTS,
    ...DIALOGS
  ]
})
export class BuilderModule { }
