import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { LoginComponent } from './login.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';
import { RouterTestingModule } from '@angular/router/testing';

class mockAuthService {
  login = jasmine.createSpy('login');
  tokenLogin = jasmine.createSpy('tokenLogin');
}

const mockToken = "mockToken";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: AuthService,
          useClass: mockAuthService
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of(mockToken)
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
