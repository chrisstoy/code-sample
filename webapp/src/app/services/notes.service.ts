import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Note, NoteSummary } from '../models/note';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private authService: AuthService, private http: HttpClient, private configService: ConfigService) {}

  /**
   * Fetch the list of notes for the current user
   */
  getNotes(): Observable<NoteSummary[]> {
    return combineLatest([this.configService.config$, this.authService.user$]).pipe(
      take(1),
      map(([config, user]) => {
        return `${config.apiUrl}/notes/${user!.id}`;
      }),
      switchMap((url: string) => {
        return this.http.get<NoteSummary[]>(url);
      })
    );
  }

  /**
   * Return the requested note, or undefined if not found
   */
  getNote(noteId: string): Observable<Note | undefined> {
    return combineLatest([this.configService.config$, this.authService.user$]).pipe(
      take(1),
      map(([config, user]) => {
        return `${config.apiUrl}/notes/${user!.id}/${noteId}`;
      }),
      switchMap((url: string) => {
        return this.http.get<Note>(url);
      })
    );
  }

  /**
   * Update the Note with the new data
   * @param note
   */
  updateNote(noteId: string, title: string, text: string): Observable<Note | undefined> {
    return combineLatest([this.configService.config$, this.authService.user$]).pipe(
      take(1),
      map(([config, user]) => {
        return `${config.apiUrl}/notes/${user!.id}/${noteId}`;
      }),
      switchMap((url: string) => {
        let body = {
          title,
          text,
        } as Note;
        return this.http.put<Note>(url, body);
      })
    );
  }

  /**
   * Create a new note
   * @param note
   */
  createNote(title: string, text: string): Observable<undefined> {
    return combineLatest([this.configService.config$, this.authService.user$]).pipe(
      take(1),
      map(([config, user]) => {
        return `${config.apiUrl}/notes/${user!.id}`;
      }),
      switchMap((url: string) => {
        let body = {
          title,
          text,
        } as Note;
        return this.http.post(url, body);
      }),
      map(() => undefined)
    );
  }

  /**
   * Delete the note
   * @param noteId note to delete
   */
  deleteNote(noteId: string): Observable<undefined> {
    return combineLatest([this.configService.config$, this.authService.user$]).pipe(
      take(1),
      map(([config, user]) => {
        return `${config.apiUrl}/notes/${user!.id}/${noteId}`;
      }),
      switchMap((url: string) => {
        return this.http.delete(url);
      }),
      map(() => undefined)
    );
  }
}
