import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'add-task', component: TaskFormComponent },
  { path: 'edit-task/:id', component: EditTaskComponent },
  //{ path: '', component: AppComponent },
  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
