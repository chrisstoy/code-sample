import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteEditorComponent } from './components/note-editor/note-editor.component';
import { NoteListComponent } from './components/note-list/note-list.component';

const routes: Routes = [
  {
    path: 'notes',
    component: NoteListComponent,
  },
  {
    path: 'note/:id',
    component: NoteEditorComponent,
  },
  // {
  //   path: 'user',
  //   component: UserDetailsComponent,
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  {
    path: '**',
    redirectTo: 'notes',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
