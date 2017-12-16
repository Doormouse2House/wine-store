import {
  async,
  TestBed
} from '@angular/core/testing';

import { DetailsComponent } from './details.component';

export function main() {
  describe('Details component', () => {

    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [],
        declarations: [DetailsComponent],
      });

    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(DetailsComponent);
            const compiled = fixture.nativeElement;

            expect(compiled).toBeTruthy();
          });
      })
    );

  });
}
