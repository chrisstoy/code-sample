import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { MockBuilder } from 'ng-mocks';
import { of } from 'rxjs';
import { NotesService } from 'src/app/services/notes.service';
import { DialogsService } from '../../dialogs/dialogs.service';
import { NoteEditorComponent } from './note-editor.component';

describe('NoteEditorComponent', () => {
  let component: NoteEditorComponent;
  let fixture: ComponentFixture<NoteEditorComponent>;

  const mockSnapshot = {
    paramMap: {
      get: () => 'mock-note-id',
    },
  } as unknown as ActivatedRouteSnapshot;

  const mockNote = {
    title: 'Mock Note',
    text: 'This is a Mock Note',
  };

  beforeEach(() => {
    return MockBuilder(NoteEditorComponent)
      .mock(MatCardModule)
      .mock(ActivatedRoute, {
        snapshot: mockSnapshot,
      })
      .mock(Router)
      .mock(NotesService, {
        getNote: jasmine.createSpy('getNote').and.returnValue(of(mockNote)),
      })
      .mock(DialogsService)
      .mock(MatSnackBar);
  });

  beforeEach(() => {
    const route = TestBed.inject(ActivatedRoute);

    fixture = TestBed.createComponent(NoteEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
