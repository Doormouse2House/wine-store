import {
  async,
  TestBed
} from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import { ProducerModule } from '../producer/producer.module';

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

    it('should emit a producer and field id onUpdate',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(DetailsComponent);
            const detailsInstance = fixture.componentInstance;
            const expectedProducer = new ProducerModule();
            const expectedId = 'myField';
            const expectedValue = 'myValue';
            const event = {
              target: {
                id: expectedId,
                value: expectedValue
              }
            };

            detailsInstance.producer = expectedProducer;

            detailsInstance.producerVariableChange.subscribe((emission: any) => {
              expect(emission.producer).toEqual(expectedProducer);
              expect(emission.field).toEqual(expectedId);
              expect(emission.producer[emission.field]).toEqual(expectedValue);
            });

            detailsInstance.onUpdate(event);
          });
      })
    );

  });
}
