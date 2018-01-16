import { Component, Input } from '@angular/core';
import { ProducerModule } from '../producer/producer.module';

/**
 * This class represents the lazy loaded DescriptionComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-description',
  templateUrl: 'description.component.html',
  styleUrls: ['description.component.css'],
})
export class DescriptionComponent {
  @Input() producer: ProducerModule;
}
