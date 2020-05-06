import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../api.service';
import { Task, User, Sprint, Tag } from '../../modeltypes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LengthValidator, IntValidator } from './taskValidator';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  id = null
  taskForm: any

  @Input() users: User[] = []
  @Input() sprints: Sprint[] = []
  @Input() tags: Tag[] = []
  @Input() tasksim: Task
  @Input() set task(data: Task) {
    this.id = data.id
    this.taskForm = new FormGroup({
      sprint_pk_id: new FormControl(data.targetsprint.id),
      task: new FormControl(data.task, Validators.compose([Validators.required, LengthValidator.longEnough])),
      description: new FormControl(data.description, Validators.required),
      criteria: new FormControl(data.criteria, Validators.required),
      responsible_pk_id: new FormControl(data.responsible.id),
      estimate: new FormControl(data.estimate, Validators.compose([Validators.required, IntValidator.integer])),
      tag_pk_id: new FormControl(data.targettag.id),
      status: new FormControl(data.status),
    })
  }

  @Output() taskCreated = new EventEmitter<Task>()
  @Output() taskUpdated = new EventEmitter<Task>()

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  asIsOrder(): number {
    return 0
  }

  saveForm() {
    if (this.id) {
      this.apiService.updateTask(
        this.id,
        this.taskForm.value.sprint_pk_id,
        this.taskForm.value.task,
        this.taskForm.value.description,
        this.taskForm.value.criteria,
        this.taskForm.value.responsible_pk_id,
        this.taskForm.value.estimate,
        this.taskForm.value.tag_pk_id,
        this.taskForm.value.status,
      ).subscribe(
        (result: Task) => this.taskUpdated.emit(result),
        error => console.log(error)
      )
    } else {
      this.apiService.createTask(
        this.taskForm.value.sprint_pk_id,
        this.taskForm.value.task,
        this.taskForm.value.description,
        this.taskForm.value.criteria,
        this.taskForm.value.responsible_pk_id,
        this.taskForm.value.estimate,
        this.taskForm.value.tag_pk_id,
        this.taskForm.value.status,
      ).subscribe(
        (result: Task) => this.taskCreated.emit(result),
        error => console.log(error)
      )
    }
  }

  SubmitButtonDisabled() {
    if (!this.taskForm.controls.task.errors.required && !this.taskForm.controls.task.errors.longEnough
      && !this.taskForm.controls.estimate.errors.required && !this.taskForm.controls.estimate.errors.integer
      && !this.taskForm.controls.description.valid && !this.taskForm.controls.criteria.valid) {
      return false
    } else {
      return true
    }
  }
}
