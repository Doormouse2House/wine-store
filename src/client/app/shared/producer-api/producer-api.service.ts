import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/do';  // for debugging

import { Config } from '../config/env.config';
import { ProducerModule } from '../../producer/producer.module';

/**
 * This class maps to the Producer API root.
 */
@Injectable()
export class ProducerApiService {
  producerRoot: string = Config.API + '/producer';

  /**
   * Creates a new ProducerApiService with the injected HttpClient.
   * @param {HttpClient} http - The injected HttpClient.
   * @constructor
   */
  constructor(private http: HttpClient) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON Producers.
   * @return {string[]} The Observable for the HTTP request.
   */
  getProducers(): Observable<string[]> {
    return this.http.get(this.producerRoot)
      .catch(this.handleError);
  }

  /**
   * Returns an Observable for the HTTP GET search for the JSON Producer.
   * @return {string[]} The Observable for the HTTP request.
   */
  get(term: string): Observable<ProducerModule[]> {
    if (term.length > 0) {
      const url: string = this.producerRoot + `?where={"name":{"contains":"${term}"}}`;
      console.log('HTTP GET: ', url);
      return this.http.get<ProducerModule[]>(url)
      //              .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    } else {
      const error = {
        'message': 'HTTP Service: Search term was empty'
      };
      if (Config.ENV = 'DEV') {
        console.log(error.message);
      }
      return Observable.throw(error.message);
    }
  }

  /**
   * Handle HTTP error
   */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error('Error: ', errMsg); // log to console instead
    console.error(error);
    return Observable.throw(errMsg);
  }
}
