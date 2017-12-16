import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProducerComponent } from './producer.component';
import { ProducerRoutingModule } from './producer-routing.module';
import { AccordionModule, ButtonModule } from 'primeng/primeng';
import { ProducerNameModule } from '../producerName/producerName.module';


@NgModule({
  imports: [CommonModule, ProducerRoutingModule, ButtonModule, AccordionModule, ProducerNameModule],
  declarations: [ProducerComponent],
  exports: [ProducerComponent],
})
export class ProducerModule { }
