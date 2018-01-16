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
            const compiled = fixture.nativeElement;

            expect(compiled).toBeTruthy();
          });
      })
    );

  });
}
