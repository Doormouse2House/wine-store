import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


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
  producer = '';

  constructor(private http: HttpClient) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  search(value: String): Observable<string[]> {
    return this.http.get('localhost:1337/producer?name=' + value)
      .catch(this.handleError);
  }

  // TODO: API calls should be via a service!  Also, need to sort out the X-domain call above
  onSearchChange( event: any ) {
    let searchResults: Observable<string[]>;

    // console.info('changed: ' + event.target.value);
    searchResults = this.search(event.target.value);

    searchResults.subscribe(producer => {
        console.log(producer);
      }, err => {
        console.error(err);
      }
    );
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
