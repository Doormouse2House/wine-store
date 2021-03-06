import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';

import { ProducerApiService } from './producer-api.service';
import { ProducerModule } from '../../producer/producer.module';

export function main() {
  describe('ProducerApi Service', () => {
    let producerApiService: ProducerApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ProducerApiService]
      });

      producerApiService = TestBed.get(ProducerApiService);
      httpMock = TestBed.get(HttpTestingController);
    });
    it('should return an Observable when getProducers called', async(() => {
      expect(TestBed.get(ProducerApiService).getProducers()).toEqual(jasmine.any(Observable));
    }));
    it('should return an Observable when get(term:string) called', async(() => {
      expect(TestBed.get(ProducerApiService).get('dama')).toEqual(jasmine.any(Observable));
    }));
    it('should search for a name when get(term:string) called', async(() => {

      const expectedProducers = [
        new ProducerModule(),
        new ProducerModule(),
        new ProducerModule()
      ];
      let actualProducers: ProducerModule[] = [];
      producerApiService.get('searchterm').subscribe((returnedProducers: ProducerModule[]) => {
        actualProducers = returnedProducers;
      });
      httpMock.expectOne(producerApiService.producerRoot + '?where={"name":{"contains":"searchterm"}}')
        .flush(expectedProducers);
      expect(actualProducers).toEqual(expectedProducers);

    }));
    it('should call HTTP /producer/:id when set() is called', async(() => {
      const expectedProducer: ProducerModule = new ProducerModule();
      expectedProducer.id = 2;
      expectedProducer.name = 'test_name';
      let actualProducer: ProducerModule = null;
      producerApiService.set({producer: expectedProducer, field: 'name'})
        .subscribe((returnedProducer: ProducerModule) => {
          actualProducer = returnedProducer;
      });
      httpMock.expectOne(producerApiService.producerRoot + '/' + '2').flush(expectedProducer);
      expect(actualProducer).toEqual(expectedProducer);
    }));
    it('should handle setting numbers and strings', async(() => {
      const expectedProducer: ProducerModule = new ProducerModule();
      expectedProducer.id = 3;
      expectedProducer.planted_hectares = 1;
      let actualProducer: ProducerModule = null;
      producerApiService.set({producer: expectedProducer, field: 'planted_hectares'})
        .subscribe((returnedProducer: ProducerModule) => {
          actualProducer = returnedProducer;
        });
      httpMock.expectOne(producerApiService.producerRoot + '/' + '3').flush(expectedProducer);
      expect(actualProducer).toEqual(expectedProducer);
    }));
  });
}
