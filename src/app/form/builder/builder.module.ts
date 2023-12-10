import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderComponent } from './builder.component';
import { BuilderRoutingModule } from './builder-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const ANGULAR_MATERIALS = [
  MatInputModule,
  MatCheckboxModule
];

const COMPONENTS = [
  BuilderComponent
]

@NgModule({
  imports: [
    CommonModule,
    BuilderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...ANGULAR_MATERIALS
  ],
  declarations: COMPONENTS
})
export class BuilderModule { }
