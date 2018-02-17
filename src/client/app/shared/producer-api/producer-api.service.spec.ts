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
  });
}
