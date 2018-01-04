import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProducerComponent } from './producer.component';
import { ProducerRoutingModule } from './producer-routing.module';
import { ProducerNameModule } from '../producerName/producerName.module';
import { ContactsModule } from '../contacts/contacts.module';
import { DetailsModule } from '../details/details.module';
import { DescriptionModule } from '../description/description.module';


@NgModule({
  imports: [CommonModule, ProducerRoutingModule, ProducerNameModule, ContactsModule, DetailsModule,
  DescriptionModule],
  declarations: [ProducerComponent],
  exports: [ProducerComponent],
})
export class ProducerModule {
  id: number;
  name: string;
  region: string;
}
