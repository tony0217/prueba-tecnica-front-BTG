import { TestBed } from '@angular/core/testing';

import { BalanceService } from './balance';

describe('BalanceService', () => {
  let service: BalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial balance of 500000', () => {
    expect(service.balance().available).toBe(500000);
    expect(service.balance().invested).toBe(0);
  });

  it('should deduct from available balance', () => {
    const result = service.deductAvailable(100000);
    expect(result).toBe(true);
    expect(service.balance().available).toBe(400000);
    expect(service.balance().invested).toBe(100000);
  });

  it('should not deduct if insufficient balance', () => {
    const result = service.deductAvailable(600000);
    expect(result).toBe(false);
    expect(service.balance().available).toBe(500000);
  });

  it('should add to available balance on cancellation', () => {
    service.deductAvailable(100000);
    service.addAvailable(100000);
    expect(service.balance().available).toBe(500000);
    expect(service.balance().invested).toBe(0);
  });
});
