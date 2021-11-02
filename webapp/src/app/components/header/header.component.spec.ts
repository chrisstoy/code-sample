import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockBuilder } from 'ng-mocks';
import { AuthService } from 'src/app/services/auth.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    return MockBuilder(HeaderComponent).mock(AuthService, {
      logout: jasmine.createSpy('logout'),
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onLogout', () => {
    it('should call authService.logout', () => {
      const authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
      component.onLogout();
      expect(authService.logout).toHaveBeenCalled();
    });
  });
});
