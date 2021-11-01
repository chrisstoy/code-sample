import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Note, NoteSummary } from '../models/note';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private authService: AuthService) {}

  /**
   * Fetch the list of notes for the current user
   */
  getNotes(): Observable<NoteSummary[]> {
    return of([
      {
        id: 'db7d4695-daf8-4bfb-a5c1-4b2f8c7a32fb',
        title: 'Things to Do',
        lastUpdate: new Date('2021-11-01T17:39:55.505Z'),
      },
      {
        id: 'f11f09f9-8dcb-4b63-84b7-37b24e000359',
        title: 'Poem',
        lastUpdate: new Date('2021-11-01T17:39:55.505Z'),
      },
    ]);
  }

  /**
   * Return the requested note, or undefined if not found
   */
  getNote(noteId: string): Observable<Note | undefined> {
    return of({
      id: 'f11f09f9-8dcb-4b63-84b7-37b24e000359',
      ownerId: '5450e4d9-3f69-4921-ad6f-28208e0f3860',
      lastUpdate: new Date('2021-11-01T17:39:55.505Z'),
      title: 'Poem',
      text: 'Roses are red, violets are blue, Yoda uses the force, and I do too!',
    });
  }

  /**
   * Update the Note with the new data
   * @param note
   */
  updateNote(id: string, title: string, text: string): Observable<Note | undefined> {
    return of(undefined);
  }

  /**
   * Create a new note
   * @param note
   */
  createNote(title: string, text: string): Observable<undefined> {
    return of(undefined);
  }

  /**
   * Delete the note
   * @param noteId note to delete
   */
  deleteNote(noteId: string): Observable<undefined> {
    return of(undefined);
  }
}
