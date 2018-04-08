import { TestBed, inject } from '@angular/core/testing';

import { LoginRedirect } from './login-redirect.service';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';

class mockAuthService {
}

describe('LoginRedirect', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        LoginRedirect,
        {
          provide: AuthService,
          useClass: mockAuthService
        }
      ],
    });
  });

  it('should be created', inject([LoginRedirect], (service: LoginRedirect) => {
    expect(service).toBeTruthy();
  }));
});
