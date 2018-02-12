import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import {
async
} from '@angular/core/testing';
import {
Route
} from '@angular/router';
import {
RouterTestingModule
} from '@angular/router/testing';

import { AppComponent } from './app.component';
import { ProducerComponent } from './producer/producer.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SearchbarComponent } from './shared/searchbar/searchbar.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProducerNameComponent } from './producerName/producerName.component';
import { DetailsComponent } from './details/details.component';
import { DescriptionComponent } from './description/description.component';
import { SearchbarService } from './shared/searchbar/searchbar.service';
import { ProducerModule } from './producer/producer.module';

export function main() {

  describe('App component', () => {

    const mockSearchbarService: MockSearchbarService = new MockSearchbarService();
    const config: Route[] = [
      { path: '', component: ProducerComponent }
    ];
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule.withRoutes(config), FormsModule],
        declarations: [TestComponent, ToolbarComponent, SearchbarComponent,
          NavbarComponent, AppComponent, ProducerComponent, ContactsComponent,
          ProducerNameComponent, DetailsComponent, DescriptionComponent],
        providers: [
          { provide: APP_BASE_HREF, useValue: '/' },
          { provide: SearchbarService, useValue: mockSearchbarService}
        ]
      });
    });

    it('should build without a problem',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(TestComponent);
            const compiled = fixture.nativeElement;

            expect(compiled).toBeTruthy();
          });
      }));
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-app></sd-app>'
})

class TestComponent {
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
