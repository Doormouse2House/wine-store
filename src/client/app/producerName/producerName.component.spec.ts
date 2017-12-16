import {
  async,
  TestBed
} from '@angular/core/testing';

import { ProducerNameComponent } from './producerName.component';

export function main() {
  describe('ProducerName component', () => {

    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [],
        declarations: [ProducerNameComponent],
      });

    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(ProducerNameComponent);
            const producerNameInstance = fixture.debugElement.componentInstance;
            const producerNameDOME1 = fixture.debugElement.nativeElement;

            expect(producerNameDOME1.querySelectorAll('div').length).toEqual(1);
            // expect(false).toEqual(true);
            // expect(producerNameDOME1.querySelectorAll('h2')[0].textContent).toEqual('Societa Agricola La Dama');
          });
      })
    );

  });
}
