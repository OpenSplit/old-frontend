import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

class mockApiService {
  getGroupInfo = jasmine.createSpy('getGroupInfo').and.callThrough();
  getGroupTransactions = jasmine.createSpy('getGroupTransactions').and.callThrough();
  getUserInfo = jasmine.createSpy('getUserInfo').and.callThrough();
  addGroup = jasmine.createSpy('addGroup').and.callThrough();
  joinGroup = jasmine.createSpy('joinGroup').and.callThrough();
  addExpense = jasmine.createSpy('addExpense').and.callThrough();
}

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [
        FormsModule
      ],
      providers: [
        {
          provide: ApiService,
          useClass: mockApiService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
