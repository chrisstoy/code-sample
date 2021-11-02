import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MockBuilder } from 'ng-mocks';
import { of } from 'rxjs';
import { DialogsService } from '../../dialogs/dialogs.service';
import { Note } from '../../models/note';
import { NotesService } from '../../services/notes.service';
import { NoteListComponent } from './note-list.component';

describe('NoteListComponent', () => {
  let component: NoteListComponent;
  let fixture: ComponentFixture<NoteListComponent>;

  let onInitSpy: jasmine.Spy;

  beforeEach(() => {
    return MockBuilder(NoteListComponent)
      .mock(MatCardModule)
      .mock(MatListModule)
      .mock(NotesService)
      .mock(Router)
      .mock(DialogsService)
      .mock(MatSnackBar);
  });

  beforeEach(() => {
    onInitSpy = spyOn(NoteListComponent.prototype, 'ngOnInit');

    fixture = TestBed.createComponent(NoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      onInitSpy.and.callThrough();
    });

    it('should call refreshNotes', () => {
      const refreshNotesSpy = spyOn<any>(component, 'refreshNotes');
      component.ngOnInit();
      expect(refreshNotesSpy).toHaveBeenCalled();
    });
  });

  describe('onSelect', () => {
    it('should navigate to passed note', () => {
      const router = TestBed.inject(Router);
      const navSpy = spyOn(router, 'navigateByUrl');

      component.onSelect({ id: 'mock-id' } as Note);
      expect(navSpy).toHaveBeenCalledWith(`/note/mock-id`);
    });
  });

  describe('onDelete', () => {
    let confirmSpy: jasmine.Spy;
    let refreshNotesSpy: jasmine.Spy;
    let deleteNoteSpy: jasmine.Spy;

    beforeEach(() => {
      const dialogService = TestBed.inject(DialogsService);
      confirmSpy = spyOn(dialogService, 'confirm');

      const notesService = TestBed.inject(NotesService);
      deleteNoteSpy = spyOn(notesService, 'deleteNote');

      refreshNotesSpy = spyOn<any>(component, 'refreshNotes');
    });

    it('should do nothing if user chooses NO', () => {
      confirmSpy.and.returnValue(of(false));

      expect(refreshNotesSpy).not.toHaveBeenCalled();
    });

    it('should delete note and then refresh notes if user chooses YES', () => {
      confirmSpy.and.returnValue(of(true));

      expect(refreshNotesSpy).not.toHaveBeenCalled();
    });
  });
});
