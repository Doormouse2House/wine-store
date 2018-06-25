import {
  async,
  TestBed
} from '@angular/core/testing';

import { DescriptionComponent } from './description.component';
import { ProducerModule } from '../producer/producer.module';

export function main() {
  describe('Description component', () => {

    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [],
        declarations: [DescriptionComponent],
      });

    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(DescriptionComponent);
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
            const fixture = TestBed.createComponent(DescriptionComponent);
            const descriptionInstance = fixture.componentInstance;
            const expectedProducer = new ProducerModule();
            const expectedId = 'myField';
            const expectedValue = 'myValue';
            const event = {
              target: {
                id: expectedId,
                textContent: expectedValue
              }
            };

            descriptionInstance.producer = expectedProducer;

            descriptionInstance.producerVariableChange.subscribe((emission: any) => {
              expect(emission.producer).toEqual(expectedProducer);
              expect(emission.field).toEqual(expectedId);
              expect(emission.producer[emission.field]).toEqual(expectedValue);
            });

            descriptionInstance.onUpdate(event);
          });
      })
    );

  });
}
