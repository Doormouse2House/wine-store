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
  @Output() producerVariableChange: EventEmitter<ProducerModule> = new EventEmitter();
  onUpdate(event: any) {
    this.producer[event.target.id] = event.target.value;
    this.producerVariableChange.emit(this.producer);
  }
}
