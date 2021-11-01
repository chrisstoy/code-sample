import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DialogsService } from 'src/app/dialogs/dialogs.service';
import { NoteSummary } from 'src/app/models/note';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {
  private readonly notesSubject = new BehaviorSubject<NoteSummary[]>([]);
  readonly notes$ = this.notesSubject.asObservable();

  constructor(
    private notesService: NotesService,
    private router: Router,
    private dialogService: DialogsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.refreshNotes();
  }

  private refreshNotes() {
    this.notesService.getNotes().subscribe((notes) => {
      this.notesSubject.next(notes);
    });
  }

  /**
   * Open the passed note
   * @param note the note to open
   */
  onSelect(note: NoteSummary) {
    this.router.navigateByUrl(`/note/${note.id}`);
  }

  onDelete(note: NoteSummary) {
    this.dialogService.confirm('Delete Note', 'Are you sure you want to delete this note?').subscribe((result) => {
      if (result) {
        // delete the note
        this.notesService.deleteNote(note.id).subscribe(() => {
          this.snackBar.open(`Note Deleted`, undefined, {
            duration: 3000,
          });
          this.refreshNotes();
        });
      }
    });
  }
}
