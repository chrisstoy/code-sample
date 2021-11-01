import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogsService } from 'src/app/dialogs/dialogs.service';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss'],
})
export class NoteEditorComponent implements OnInit {
  public noteForm: FormGroup;

  private noteId: string | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notesService: NotesService,
    private dialogService: DialogsService,
    private snackBar: MatSnackBar
  ) {
    this.noteForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(48)]),
      text: new FormControl('', [Validators.required, Validators.maxLength(2048)]),
    });
    this.noteForm.disable();
  }

  ngOnInit(): void {
    this.noteId = this.route.snapshot.paramMap.get('id') ?? undefined;
    if (this.noteId) {
      this.notesService.getNote(this.noteId).subscribe((note) => {
        this.noteForm.setValue({
          title: note?.title ?? '',
          text: note?.text ?? '',
        });
        this.noteForm.enable();
      });
    } else {
      this.noteForm.enable();
    }
  }

  /**
   * Return to note list without making any changes
   */
  onCancel() {
    if (this.noteForm.dirty) {
      // inform user they are going to lose changes
      this.dialogService
        .confirm('Unsaved Changes', 'There are unsaved changes. Are you sure you wish to exit?')
        .subscribe((result) => {
          if (result) {
            this.router.navigateByUrl(`/notes`);
          }
        });
    } else {
      // no changes, so go ahead and exit the page
      this.router.navigateByUrl(`/notes`);
    }
  }

  /**
   * Create or Update note
   */
  onSubmit() {
    const { title, text } = this.noteForm.getRawValue();

    if (this.noteId) {
      // update existing note
      this.notesService.updateNote(this.noteId, title, text).subscribe(() => {
        this.snackBar.open(`Note Updated`, undefined, {
          duration: 3000,
        });
        this.router.navigateByUrl(`/notes`);
      });
    } else {
      // create a new note
      this.notesService.createNote(title, text).subscribe(() => {
        this.snackBar.open(`Note Created`, undefined, {
          duration: 3000,
        });
        this.router.navigateByUrl(`/notes`);
      });
    }
  }
}
