import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DetailsComponent } from './details.component';


@NgModule({
  imports: [CommonModule],
  declarations: [DetailsComponent],
  exports: [DetailsComponent],
})
export class DetailsModule { }
