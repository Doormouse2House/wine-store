import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProducerNameComponent } from './producerName.component';


@NgModule({
  imports: [CommonModule],
  declarations: [ProducerNameComponent],
  exports: [ProducerNameComponent],
})
export class ProducerNameModule { }
