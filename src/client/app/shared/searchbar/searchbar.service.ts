import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ProducerModule } from '../../producer/producer.module';
import { ProducerApiService } from '../producer-api/producer-api.service';

/**
 * This class provides the Searchbar service with methods to get Producers, utilising the ProducerApiService
 */
@Injectable()
export class SearchbarService {
  //  Observable producer source
  private producerSource = new Subject<ProducerModule>();

  //  Observable producer stream
  producerSelected$ = this.producerSource.asObservable();   // tslint:disable-line

  /**
   * Creates a new SearchbarService with the injected HttpClient.
   * @param {HttpClient} http - The injected HttpClient.
   * @param {ProducerApiService} producerApiService
   * @constructor
   */
  constructor(private http: HttpClient, private producerApiService: ProducerApiService) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON Producers.
   * @return {string[]} The Observable for the HTTP request.
   */
  getProducers(): Observable<string[]> {
    return this.producerApiService.getProducers();
  }


  /**
   * Returns an Observable for the HTTP GET search for the JSON Producer.
   * @return {string[]} The Observable for the HTTP request.
   */
  searchProducer(term: string): Observable<ProducerModule[]> {
    return this.producerApiService.get(term);
  }

  /**
   * Sets the producerSource based on the provided ProducerModule.
   * @return {ProducerModule}
   */
  selectProducer(producer: ProducerModule) {
    this.producerSource.next(producer);
  }

}
