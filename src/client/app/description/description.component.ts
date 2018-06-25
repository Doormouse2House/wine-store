import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ProducerModule } from '../producer/producer.module';
import { Config } from '../shared/config/env.config';

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
  @Output() producerVariableChange: EventEmitter<{}> = new EventEmitter();
  onUpdate(event: any) {
    if (Config.ENV = 'DEV') {
      console.log(event);
    }
    this.producer[event.target.id] = event.target.valueAsNumber || event.target.textContent;
    this.producerVariableChange.emit({ producer: this.producer, field: event.target.id});
  }
}
