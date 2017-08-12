import { TestBed, inject } from '@angular/core/testing';

import { ThreadEffectService } from './thread-effect.service';

describe('ThreadEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThreadEffectService]
    });
  });

  it('should be created', inject([ThreadEffectService], (service: ThreadEffectService) => {
    expect(service).toBeTruthy();
  }));
});
