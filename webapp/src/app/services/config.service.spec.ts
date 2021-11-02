import { TestBed } from '@angular/core/testing';
import { hot } from 'jasmine-marbles';
import { MockBuilder } from 'ng-mocks';

import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(() => {
    return MockBuilder(ConfigService);
  });

  beforeEach(() => {
    service = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('constructor', () => {
    it('should set initial configuration', () => {
      const expected$ = hot('a', {
        a: {
          apiUrl: 'localhost:4200/api',
        },
      });

      expect(service.config$).toBeObservable(expected$);
    });
  });
});
