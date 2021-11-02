import { TestBed } from '@angular/core/testing';
import { MockBuilder } from 'ng-mocks';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    return MockBuilder(UsersService);
  });

  beforeEach(() => {
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
