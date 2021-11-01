import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogsService {
  constructor(private dialog: MatDialog) {}

  /**
   * Display a confirmation dialog
   */
  confirm(title: string, content: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title,
        content,
      },
    });
    return dialogRef.afterClosed();
  }
}
