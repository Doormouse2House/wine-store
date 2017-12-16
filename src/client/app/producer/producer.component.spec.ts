import {
  async,
  TestBed
} from '@angular/core/testing';

import { ProducerComponent } from './producer.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { ProducerNameComponent } from '../producerName/producerName.component';

export function main() {
  describe('Producer component', () => {

    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [],
        declarations: [ProducerComponent, ContactsComponent, ProducerNameComponent],
      });

    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(ProducerComponent);
            const compiled = fixture.nativeElement;

            expect(compiled).toBeTruthy();
          });
      })
    );

  });
}
