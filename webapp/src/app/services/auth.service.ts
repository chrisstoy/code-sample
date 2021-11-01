import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | undefined>(undefined);
  readonly user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private config: ConfigService) {
    // TODO - for now, assume we are always logged in as Luke Skywalker
    this.authenticate('luke@tatooine.net', 'password');
  }

  /**
   * Authenticate the user and set the current user$ to them, or undefined if error
   * @param email - email address of the user
   * @param password - password to use for authentication
   */
  authenticate(email: string, password: string): Observable<User | undefined> {
    this.userSubject.next({
      id: '5450e4d9-3f69-4921-ad6f-28208e0f3860',
      firstName: 'Luke',
      lastName: 'Skywalker',
      email: 'luke@tatooine.net',
      isAdmin: false,
      lastLogin: new Date('2021-11-01T17:39:55.502Z'),
    });
    return this.user$;
  }
}
