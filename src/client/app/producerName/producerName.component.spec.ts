import {
  async,
  TestBed
} from '@angular/core/testing';

import { ProducerNameComponent } from './producerName.component';
import { ProducerModule } from '../producer/producer.module';

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

    it('should emit a producer and field id onUpdate',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(ProducerNameComponent);
            const producerNameInstance = fixture.componentInstance;
            const expectedProducer = new ProducerModule();
            const expectedId = 'myField';
            const expectedValue = 'myValue';
            const event = {
              target: {
                id: expectedId,
                textContent: expectedValue
              }
            };

            producerNameInstance.producer = expectedProducer;

            producerNameInstance.producerVariableChange.subscribe((emission: any) => {
              expect(emission.producer).toEqual(expectedProducer);
              expect(emission.field).toEqual(expectedId);
              expect(emission.producer[emission.field]).toEqual(expectedValue);
            });

            producerNameInstance.onUpdate(event);
          });
      })
    );

  });
}
