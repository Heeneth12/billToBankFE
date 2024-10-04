import { TestBed } from '@angular/core/testing';

import { BillToBankCommonService } from './bill-to-bank-common.service';

describe('BillToBankCommonService', () => {
  let service: BillToBankCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillToBankCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
