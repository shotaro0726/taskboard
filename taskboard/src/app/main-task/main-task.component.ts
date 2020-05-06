import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Task, User, Sprint, Tag } from '../modeltypes'; 

@Component({
  selector: 'app-main-task',
  templateUrl: './main-task.component.html',
  styleUrls: ['./main-task.component.css']
})

export class MainTaskComponent implements OnInit {

  tasks: Task[] = [];
  users: User[] = [];
  sprints: Sprint[] = [];
  tags: Tag[] = [];
  selectedTask: Task = null;
  editedTask: any = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getTasks().subscribe(
      (data: Task[]) => {
        this.tasks = data
      },
      error => console.log(error)
    ) 

    this.apiService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data
      },
      error => console.log(error)
    ) 

    this.apiService.getSprints().subscribe(
      (data: Sprint[]) => {
        this.sprints = data
      },
      error => console.log(error)
    ) 

    this.apiService.getTags().subscribe(
      (data: Tag[]) => {
        this.tags = data
      },
      error => console.log(error)
    ) 
  }

  selectTask(task: Task) {
    this.selectedTask = task
    this.editedTask = null
    console.log(this.selectedTask)
  }

  editTask(task: Task) {
    this.editedTask = task
    this.selectedTask = null
  }

  createNewTask() {
    this.editedTask = { targetsprint: { "id": 1 }, task: "", description: "", criteria: "", responsible: { "id": 1 }, estimate: '', targettag: { "id": 1 }, status: "1" }
    this.selectedTask = null
  }

  deletedTask(task: Task) {
    this.apiService.deleteTask(task.id).subscribe(
      data => {
        this.tasks = this.tasks.filter(tas => tas.id !== task.id)
        this.editedTask = null
      },
      error => console.log("error")
    )
  }

  taskCreated(task: Task) {
    this.tasks.unshift(task)
    this.editedTask = null
  }

  taskUpdated(task: Task) {
    const indexup = this.tasks.findIndex(tas => tas.id === task.id)
    if (indexup >= 0) {
      this.tasks[indexup] = task
    }
    this.editedTask = null
  }
}
