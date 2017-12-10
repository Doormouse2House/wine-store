import {
  async,
  TestBed
} from '@angular/core/testing';

import { ProducerComponent } from './producer.component';

export function main() {
  describe('Producer component', () => {

    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [],
        declarations: [ProducerComponent],
      });

    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(ProducerComponent);
            const producerInstance = fixture.debugElement.componentInstance;
            const producerDOME1 = fixture.debugElement.nativeElement;

            expect(producerDOME1.querySelectorAll('p').length).toEqual(1);
            // expect(producerDOME1.querySelectorAll('p').length).toEqual(1);
          });
      })
    );

  });
}
