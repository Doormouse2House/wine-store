import {
  async,
  TestBed
} from '@angular/core/testing';

import { SearchbarService } from './searchbar.service';
import { SearchbarComponent } from './searchbar.component';
import { ProducerModule } from '../../producer/producer.module';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export function main() {
  describe('Searchbar component', () => {

    const mockSearchbarService: MockSearchbarService = new MockSearchbarService();
    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [],
        declarations: [SearchbarComponent],
        providers: [{ provide: SearchbarService, useValue: mockSearchbarService}]
      });

    });

  });

  it('should work', () => {
    async(() => {
      TestBed
        .compileComponents()
        .then(() => {
          const fixture = TestBed.createComponent(SearchbarComponent);
          const searchbarInstance = fixture.componentInstance;
        });
    });
  });

}

class MockSearchbarService {

  returnValue: string[];
  producerSource = new Subject<ProducerModule>();
  producerSelected$ = this.producerSource.asObservable();
  emitProducer() {
    const producer = new ProducerModule();
    producer.id = 1;
    producer.name = 'test';
    this.producerSource.next(producer);
  }

  getProducers(): Observable<string[]> {
    return Observable.create((observer: any) => {
      observer.next(this.returnValue);
      observer.complete();
    });
  }
  searchProducer(term: string): Observable<ProducerModule[]> {
    return Observable.create((observer: any) => {
      observer.next(this.returnValue);
      observer.complete();
    });
  }
  selectProducer(producer: ProducerModule) {
    //
  }
}
