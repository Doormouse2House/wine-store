import { Component } from '@angular/core';

import { ProducerModule } from './producer.module';
import { SearchbarService } from '../shared/searchbar/searchbar.service';
import { ProducerApiService } from '../shared/producer-api/producer-api.service';

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
   * @param {ProducerApiService} producerApiService
   */
  constructor(public searchbarService: SearchbarService, private  producerApiService: ProducerApiService) {
    this.searchbarService.producerSelected$.subscribe(
      producer => {
        this.selectedProducer = producer;
      }
    );

  }
  handleProducerUpdate(update: {producer: ProducerModule, field: string}) {
    this.producerApiService.set(update).subscribe((producer) => {
      this.selectedProducer = producer;
    });
  }
}
