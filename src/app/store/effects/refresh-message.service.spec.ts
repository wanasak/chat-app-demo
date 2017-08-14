import { TestBed, inject } from '@angular/core/testing';

import { RefreshMessageService } from './refresh-message.service';

describe('RefreshMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RefreshMessageService]
    });
  });

  it('should be created', inject([RefreshMessageService], (service: RefreshMessageService) => {
    expect(service).toBeTruthy();
  }));
});
