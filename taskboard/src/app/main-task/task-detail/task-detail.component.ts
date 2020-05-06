import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { Task } from '../../modeltypes';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  @Input() task: Task
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

}
