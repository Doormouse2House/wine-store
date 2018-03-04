import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProducerModule } from '../producer/producer.module';
import { Config } from '../shared/config/env.config';

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
  @Output() producerVariableChange: EventEmitter<{}> = new EventEmitter();
  onUpdate(event: any) {
    if (Config.ENV = 'DEV') {
      console.log(event);
    }    this.producer[event.target.id] = event.target.valueAsNumber || event.target.textContent;
    this.producerVariableChange.emit({ producer: this.producer, field: event.target.id});
  }
}
