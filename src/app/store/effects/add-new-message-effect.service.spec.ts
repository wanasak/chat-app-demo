import { TestBed, inject } from '@angular/core/testing';

import { AddNewMessageEffectService } from './add-new-message-effect.service';

describe('AddNewMessageEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddNewMessageEffectService]
    });
  });

  it('should be created', inject([AddNewMessageEffectService], (service: AddNewMessageEffectService) => {
    expect(service).toBeTruthy();
  }));
});
