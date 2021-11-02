import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { hot } from 'jasmine-marbles';
import { MockBuilder } from 'ng-mocks';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';

describe('AuthService', () => {
  let service: AuthService;
  let authenticateSpy: jasmine.Spy;

  beforeEach(() => {
    return MockBuilder(AuthService).mock(HttpClient).mock(ConfigService);
  });

  beforeEach(() => {
    authenticateSpy = spyOn(AuthService.prototype, 'authenticate');
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('constructor', () => {
    it('should call authenticate when created', () => {
      expect(authenticateSpy).toHaveBeenCalled();
    });
  });

  describe('authenticate', () => {
    beforeEach(() => {
      authenticateSpy.and.callThrough();
    });

    it('should return user data', () => {
      const expected$ = hot('a', {
        a: {
          id: '5450e4d9-3f69-4921-ad6f-28208e0f3860',
          firstName: 'Luke',
          lastName: 'Skywalker',
          email: 'luke@tatooine.net',
          isAdmin: false,
          lastLogin: new Date('2021-11-01T17:39:55.502Z'),
        },
      });
      const result$ = service.authenticate('luke@tatooine.net', 'password');
      expect(result$).toBeObservable(expected$);
    });
  });
});
