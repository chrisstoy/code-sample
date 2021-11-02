import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { MockBuilder } from 'ng-mocks';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { NotesService } from './notes.service';

describe('NotesService', () => {
  let service: NotesService;

  beforeEach(() => {
    return MockBuilder(NotesService).mock(AuthService).mock(HttpClient).mock(ConfigService);
  });

  beforeEach(() => {
    service = TestBed.inject(NotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getNotes', () => {
    it('should return list of notes', () => {
      const expected$ = cold('(a|)', {
        a: [
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
        ],
      });

      const result$ = service.getNotes();
      expect(result$).toBeObservable(expected$);
    });
  });

  describe('getNote', () => {
    it('should return requested note', () => {
      const expected$ = cold('(a|)', {
        a: {
          id: 'f11f09f9-8dcb-4b63-84b7-37b24e000359',
          ownerId: '5450e4d9-3f69-4921-ad6f-28208e0f3860',
          lastUpdate: new Date('2021-11-01T17:39:55.505Z'),
          title: 'Poem',
          text: 'Roses are red, violets are blue, Yoda uses the force, and I do too!',
        },
      });

      const result$ = service.getNote('f11f09f9-8dcb-4b63-84b7-37b24e000359');
      expect(result$).toBeObservable(expected$);
    });
  });

  describe('updateNote', () => {});
  describe('createNote', () => {});
  describe('deleteNote', () => {});
});
