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
        providers: [{provide: SearchbarService, useValue: mockSearchbarService}]
      });

    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(SearchbarComponent);
            const compiled = fixture.nativeElement;

            expect(compiled).toBeTruthy();
          });
      })
    );

    it('should update selectedProducer',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(SearchbarComponent);
            const searchbarInstance = fixture.componentInstance;
            const producer = new ProducerModule();
            mockSearchbarService.emitProducer(producer);
            expect(searchbarInstance.selectedProducer).toEqual(producer);
          });
      })
    );

    it('should manage up and down keys',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(SearchbarComponent);
            const searchbarInstance = fixture.componentInstance;
            searchbarInstance.producers = [new ProducerModule(), new ProducerModule()];

            expect(searchbarInstance.upDownKey('ArrowDown')).toEqual(true);
            expect(searchbarInstance.highlightedIndex).toEqual(1);
            searchbarInstance.upDownKey('ArrowDown');
            expect(searchbarInstance.highlightedIndex).toEqual(2);
            searchbarInstance.upDownKey('ArrowDown');
            expect(searchbarInstance.highlightedIndex).toEqual(2);

            expect(searchbarInstance.upDownKey('ArrowUp')).toEqual(true);
            expect(searchbarInstance.highlightedIndex).toEqual(1);
            searchbarInstance.upDownKey('ArrowUp');
            expect(searchbarInstance.highlightedIndex).toEqual(0);
            searchbarInstance.upDownKey('ArrowUp');
            expect(searchbarInstance.highlightedIndex).toEqual(0);

            expect(searchbarInstance.upDownKey('Other')).toEqual(false);
          });
      })
    );

    it('should update the highlightedIndex based on the dataset index',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(SearchbarComponent);
            const searchbarInstance = fixture.componentInstance;
            const event = {target: {dataset: {index: 1}}};

            searchbarInstance.mouseOver(event);
            expect(searchbarInstance.highlightedIndex).toEqual(2);
          });
      })
    );

    it('should support a check for whether an index is highlighted or not',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(SearchbarComponent);
            const searchbarInstance = fixture.componentInstance;
            searchbarInstance.highlightedIndex = 1;

            expect(searchbarInstance.isHighlighted(1)).toEqual(true);
            expect(searchbarInstance.isHighlighted(2)).toEqual(false);
          });
      })
    );

    it('should search for a producer when onSearchChange is called (except for up/down keys)',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(SearchbarComponent);
            const searchbarInstance = fixture.componentInstance;
            // stub out and spy on check for upDownKey
            searchbarInstance.upDownKey = function(key: string) {
              return false;
            };
            spyOn(searchbarInstance, 'upDownKey');
            // stub out and spy on searchProducers
            searchbarInstance.searchProducers = function(value: string) {
              const x: any = null;
            };
            spyOn(searchbarInstance, 'searchProducers');
            searchbarInstance.onSearchChange({key: 'mykey', target: {value: 'myvalue'}});

            expect(searchbarInstance.upDownKey).toHaveBeenCalledWith('mykey');
            expect(searchbarInstance.searchProducers).toHaveBeenCalledWith('myvalue');
          });
      })
    );

    it('should use the searchbarService to search for a producer, and capture the returned array',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(SearchbarComponent);
            const searchbarInstance = fixture.componentInstance;
            searchbarInstance.highlightedIndex = 3;
            searchbarInstance.searchProducers('term');

            expect(searchbarInstance.producers = mockSearchbarService.producers);
            // reset the highlightedIndex
            expect(searchbarInstance.highlightedIndex).toEqual(0);
          });
      })
    );

    it('should reset all values if the search returns nothing',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(SearchbarComponent);
            const searchbarInstance = fixture.componentInstance;
            // Update our mock to error on searchProducer()
            mockSearchbarService.searchProducer = (term: string): Observable<ProducerModule[]> => {
              return Observable.create((observer: any) => {
                observer.error(term);
                observer.complete();
              });
            };

            searchbarInstance.searchProducers('term');
            expect(searchbarInstance.producers).toEqual(undefined);
            expect(searchbarInstance.highlightedIndex).toEqual(0);
            expect(searchbarInstance.errorMessage).toEqual('term');
          });
      })
    );

  });

}

class MockSearchbarService {

  returnValue: string[];
  producerSource = new Subject<ProducerModule>();
  producerSelected$ = this.producerSource.asObservable();
  producer1 = new ProducerModule();
  producer2 = new ProducerModule();
  producers = [this.producer1, this.producer2];

  emitProducer(producer: ProducerModule) {
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
    this.producer1.id = 1;
    this.producer2.id = 2;
    return Observable.create((observer: any) => {
      observer.next(this.producers);
      observer.complete();
    });
  }

  selectProducer(producer: ProducerModule) {
    //
  }
}
