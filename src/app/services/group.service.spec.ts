import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { GroupService } from './group.service';

describe('GroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [GroupService]
    });
  });

  it('should be created', inject([GroupService], (service: GroupService) => {
    expect(service).toBeTruthy();
  }));
});
