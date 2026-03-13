import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FundsService } from './funds';

describe('FundsService', () => {
  let service: FundsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FundsService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(FundsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
