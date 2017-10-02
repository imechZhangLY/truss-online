/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TrussService } from './truss.service';

describe('TrussService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrussService]
    });
  });

  it('should ...', inject([TrussService], (service: TrussService) => {
    expect(service).toBeTruthy();
  }));
});
