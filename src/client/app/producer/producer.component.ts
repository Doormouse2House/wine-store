import { Component } from '@angular/core';

import { ProducerModule } from './producer.module';
import { SearchbarService } from '../shared/searchbar/searchbar.service';

/**
 * This class represents the lazy loaded ProducerComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-producer',
  templateUrl: 'producer.component.html',
  styleUrls: ['producer.component.css'],
})
export class ProducerComponent {
  selectedProducer: ProducerModule;

  /**
   * Creates an instance of the ProducerComponent with the injected
   * SearchbarService.
   *
   * @param {SearchbarService} searchbarService - The injected SearchbarService.
   */
  constructor(public searchbarService: SearchbarService) {
    this.searchbarService.producerSelected$.subscribe(
      producer => {
        this.selectedProducer = producer;
      }
    );

  }
  handleProducerUpdate(producer: ProducerModule) {
    console.log(producer);
  }
}
