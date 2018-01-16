import { Component, Input } from '@angular/core';
import { ProducerModule } from '../producer/producer.module';

/**
 * This class represents the lazy loaded DetailsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-details',
  templateUrl: 'details.component.html',
  styleUrls: ['details.component.css'],
})
export class DetailsComponent {
  @Input() producer: ProducerModule;
}
