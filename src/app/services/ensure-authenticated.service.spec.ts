import { TestBed, inject } from '@angular/core/testing';

import { EnsureAuthenticated } from './ensure-authenticated.service';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';

class mockAuthService { }

describe('EnsureAuthenticated', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        EnsureAuthenticated,
        {
          provide: AuthService,
          useClass: mockAuthService
        }
      ]
    });
  });

  it('should be created', inject([EnsureAuthenticated], (service: EnsureAuthenticated) => {
    expect(service).toBeTruthy();
  }));
});
