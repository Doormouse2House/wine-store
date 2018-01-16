import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

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
import { FormsModule } from '@angular/forms';

export function main() {

  describe('App component', () => {

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
          { provide: APP_BASE_HREF, useValue: '/' }
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



