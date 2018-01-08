import { Component, HostListener } from '@angular/core';
import { SearchbarService } from './searchbar.service';
import { ProducerModule } from '../../producer/producer.module';


/**
 * This class represents the searchbar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-searchbar',
  templateUrl: 'searchbar.component.html',
  styleUrls: ['searchbar.component.css'],
})
export class SearchbarComponent {
  errorMessage: string;
  producers: ProducerModule[] | undefined = undefined;
  selectedProducer: ProducerModule;
  highlightedIndex = 0;

  /**
   * Creates an instance of the SearchbarComponent with the injected
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

  /**
   * Manage highlighted Index via up/down keys
   */
  upDownKey( key: string ): boolean {
    switch (key) {
      case 'ArrowDown':
        if (this.producers && this.producers.length > this.highlightedIndex) {
          this.highlightedIndex++;
        }
        return true;
      case 'ArrowUp':
        if (this.producers && this.highlightedIndex > 0) {
          this.highlightedIndex--;
        }
        return true;
      default:
        return false;
    }
  }

  /**
   * Manage highlighted Index via mouseOver event
   */
  mouseOver( event: any ) {
    this.highlightedIndex = Number(event.target.dataset.index) + 1;
  }

  /**
   * Check if item is highlighted
   */
  isHighlighted( index: number ) {
    return this.highlightedIndex === index;
  }

  /**
   * Manage click event; if on one of our items, select it, otherwise clear the producers
   * @param {Event} event
   */
  @HostListener('document:click', ['$event'])
  public documentClick(event: Event): void {
    //  TODO: Not currently managing the "select it" section
    this.producers = undefined;
  }

  /**
   * Handle the searchbarService observable
   */
  searchProducers(term: string) {
    this.searchbarService.searchProducer(term)
      .subscribe(
        producers => {
          this.producers = producers;
          //  Reset the highlightedIndex if necessary
          if (this.highlightedIndex > this.producers.length)
            this.highlightedIndex = 0;
        },
        error => {
          this.producers = undefined;
          this.highlightedIndex = 0;
          this.errorMessage = <any>error;
        });
    //  TODO: At the moment, if we only get one result, let's just auto-select it;
    //  TODO: As this is not linked to the Obs it won't be updated correctly (only on the second pass)
    if (this.producers)
      this.searchbarService.selectProducer(this.producers[0]);
  }

  onSearchChange( event: any ) {
    if (!this.upDownKey(event.key))
      this.searchProducers(event.target.value);
  }
}
