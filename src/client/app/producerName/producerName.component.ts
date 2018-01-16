import { Component, Input } from '@angular/core';
import { ProducerModule } from '../producer/producer.module';

/**
 * This class represents the lazy loaded ProducerNameComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-producer-name',
  templateUrl: 'producerName.component.html',
  styleUrls: ['producerName.component.css'],
})
export class ProducerNameComponent {
  @Input() producer: ProducerModule;
}
