import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../api.service';
import { Task, Sprint } from '../../modeltypes';
import { faTrash, faEdit, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  idsprint: string = "1"
  faTrash = faTrash
  faEdit = faEdit
  faThumbtack = faThumbtack

  @Input() tasks: Task[] = []
  @Input() sprints: Sprint[] = []
  @Input() sortedData: Task[] = []
  
  @Output() selectTask = new EventEmitter<Task>()
  @Output() createNewTask = new EventEmitter()
  @Output() editedTask = new EventEmitter<Task>()
  @Output() deletedTask = new EventEmitter<Task>()

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  taskClicked(task: Task): void {
    this.selectTask.emit(task)
  }

  createTask(): void {
    this.createNewTask.emit()
  }

  editTask(task: Task): void {
    this.editedTask.emit(task)
  }

  deleteTask(task: Task): void {
    this.deletedTask.emit(task)
  }

  sortData(sort: Sort) {
    const tasks = this.tasks
    if (!sort.active || sort.direction === "") {
      this.sortedData = tasks
      return 
    }
    this.sortedData = tasks.sort((a, b) => {
      const asc = sort.direction == 'asc' ? 1 : -1;
      switch (sort.active) {
        case 'task': return (a.id < b.id ? 1 : -1) * asc;
        case 'category': return (a.targettag.id < b.targettag.id ? 1 : -1) * asc;
        case 'responsible': return (a.responsible.id < b.responsible.id ? 1 : -1) * asc;
        case 'status': return (a.status < b.status ? 1 : -1) * asc;
        default: return 0;
      }
    })
  }

  onChangeSelect(value: string): void {
    this.idsprint = value
  }

}
