import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnswersComponent } from './answers.component';
import { AnswersRoutingModule } from './answers-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AnswersRoutingModule
  ],
  declarations: [AnswersComponent]
})
export class AnswersModule { }
