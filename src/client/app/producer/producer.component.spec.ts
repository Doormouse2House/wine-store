import {
  async,
  TestBed
} from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { ProducerComponent } from './producer.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { ProducerNameComponent } from '../producerName/producerName.component';
import { DetailsComponent } from '../details/details.component';
import { DescriptionComponent } from '../description/description.component';
import { SearchbarService } from '../shared/searchbar/searchbar.service';
import { ProducerModule } from './producer.module';
import { SearchbarComponent } from '../shared/searchbar/searchbar.component';
import { Subject } from 'rxjs/Subject';

export function main() {
  describe('Producer component', () => {

    const mockSearchbarService: MockSearchbarService = new MockSearchbarService();
    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [],
        declarations: [ProducerComponent, ContactsComponent, ProducerNameComponent, DetailsComponent,
          DescriptionComponent, SearchbarComponent],
        providers: [
          { provide: SearchbarService, useValue: mockSearchbarService}
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
