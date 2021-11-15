import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export interface Configuration {
  apiUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly configSubject = new ReplaySubject<Configuration>(1);
  readonly config$ = this.configSubject.asObservable();

  constructor() {
    this.configSubject.next({
      apiUrl: 'http://localhost:3000',
    });
  }
}
