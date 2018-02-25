import {
  async,
  TestBed
} from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ProducerComponent } from './producer.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { ProducerNameComponent } from '../producerName/producerName.component';
import { DetailsComponent } from '../details/details.component';
import { DescriptionComponent } from '../description/description.component';
import { SearchbarService } from '../shared/searchbar/searchbar.service';
import { ProducerModule } from './producer.module';
import { SearchbarComponent } from '../shared/searchbar/searchbar.component';
import { ProducerApiService } from '../shared/producer-api/producer-api.service';

export function main() {
  describe('Producer component', () => {

    const mockSearchbarService: MockSearchbarService = new MockSearchbarService();
    const mockProducerApiService: MockProducerApiService = new MockProducerApiService();
    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [],
        declarations: [ProducerComponent, ContactsComponent, ProducerNameComponent, DetailsComponent,
          DescriptionComponent, SearchbarComponent],
        providers: [
          { provide: SearchbarService, useValue: mockSearchbarService },
          { provide: ProducerApiService, useValue: mockProducerApiService }
        ]
      });

    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(ProducerComponent);
            const producerInstance = fixture.componentInstance;

            fixture.detectChanges();

            mockSearchbarService.emitProducer();

            expect(producerInstance.selectedProducer.id).toEqual(1);
            expect(producerInstance.selectedProducer.name).toEqual('test');

            const compiled = fixture.nativeElement;

            expect(compiled).toBeTruthy();
          });
      })
    );

    it('should update the producer via the API when there is an update',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(ProducerComponent);
            const producerInstance = fixture.componentInstance;

            producerInstance.handleProducerUpdate(
              {
                producer: mockProducerApiService.producer,
                field: 'name'
              });
            mockProducerApiService.emitProducer();

            expect(producerInstance.selectedProducer).toEqual(mockProducerApiService.producer);

          });
      })
    );

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


class MockProducerApiService {
  producerSource = new Subject<ProducerModule>();
  producerObservable$ = this.producerSource.asObservable();
  producer: ProducerModule = new ProducerModule();
  emitProducer() {
    this.producer.id = 1;
    this.producer.name = 'test';
    this.producerSource.next(this.producer);
  }
  set(producer: ProducerModule): Observable<ProducerModule> {
    this.producer = producer;
    return this.producerObservable$;
  }
}
