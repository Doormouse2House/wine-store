import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DescriptionComponent } from './description.component';


@NgModule({
  imports: [CommonModule],
  declarations: [DescriptionComponent],
  exports: [DescriptionComponent],
})
export class DescriptionModule { }
