import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() producerVariableChange: EventEmitter<{}> = new EventEmitter();
  onUpdate(event: any) {
    console.log(event);
    this.producer[event.target.id] = event.target.valueAsNumber || event.target.value;
    this.producerVariableChange.emit({ producer: this.producer, field: event.target.id});
  }
}
