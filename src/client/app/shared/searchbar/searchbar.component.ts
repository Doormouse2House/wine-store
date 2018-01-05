import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
  producers: ProducerModule[] = [];

  /**
   * Creates an instance of the SearchbarComponent with the injected
   * SearchbarService.
   *
   * @param {SearchbarService} searchbarService - The injected SearchbarService.
   */
  constructor(public searchbarService: SearchbarService) {}

  /**
   * Handle the searchbarService observable
   */
  searchProducers(term: string) {
    this.searchbarService.searchProducer(term)
      .subscribe(
        producers => this.producers = producers,
        error => this.errorMessage = <any>error
      );
  }

  // TODO: API calls should be via a service!  Also, need to sort out the X-domain call above
  onSearchChange( event: any ) {
    // console.info('changed: ' + event.target.value);
    this.searchProducers(event.target.value);
  }

  /**
   * Handle HTTP error
   */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
