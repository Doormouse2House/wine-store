import { Component, Input } from '@angular/core';
import { ProducerModule } from '../producer/producer.module';

/**
 * This class represents the lazy loaded ContactsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-contacts',
  templateUrl: 'contacts.component.html',
  styleUrls: ['contacts.component.css'],
})
export class ContactsComponent {
  @Input() producer: ProducerModule;
}
