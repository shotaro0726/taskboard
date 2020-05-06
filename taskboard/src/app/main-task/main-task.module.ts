import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainTaskComponent } from './main-task.component';

import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { ApiService } from '../api.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SprintfilterPipe } from './sprintfilter.pipe';
 
const routes: Routes = [
  {path: 'tasks', component: MainTaskComponent}
]

@NgModule({
  declarations: [MainTaskComponent, TaskListComponent, TaskFormComponent, TaskDetailComponent, SprintfilterPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatFormFieldModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatBadgeModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    ApiService,
  ],
})
export class MainTaskModule { }
