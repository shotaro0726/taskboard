import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from './modeltypes';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  rootUrl = 'http://127.0.0.1:8000/';
  taskUrl = `${this.rootUrl}api/tasks/`;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  getTasks() {
    return this.httpClient.get<Task[]>(this.taskUrl, { headers: this.getAuthenHeaders() })
  }

  createTask(sprint_pk_id: number, task: string, description: string, criteria: string, responsible_pk_id: number, estimate: number, tag_pk_id: number, status: string) {
    const body = JSON.stringify({ sprint_pk_id, task, description, criteria, responsible_pk_id, estimate, tag_pk_id, status })
    return this.httpClient.post(this.taskUrl, body, { headers: this.getAuthenHeaders() })
  }
  updateTask(id: number, sprint_pk_id: number, task: string, description: string, criteria: string, responsible_pk_id: number, estimate: number, tag_pk_id: number, status: string) {
    const body = JSON.stringify({ sprint_pk_id, task, description, criteria, responsible_pk_id, estimate, tag_pk_id, status })
    return this.httpClient.put(`${this.taskUrl}${id}/`, body, { headers: this.getAuthenHeaders() })
  }

  deleteTask(id: number) {
    return this.httpClient.delete(`${this.taskUrl}${id}/`, { headers: this.getAuthenHeaders() });
  }

  getUsers() {
    return this.httpClient.get(`${this.rootUrl}api/users/`, { headers: this.getAuthenHeaders() });
  }

  getSprints() {
    return this.httpClient.get(`${this.rootUrl}api/sprints/`, { headers: this.getAuthenHeaders() });
  }

  getTags() {
    return this.httpClient.get(`${this.rootUrl}api/tags/`, { headers: this.getAuthenHeaders() });
  }

  loginUser(authenData) {
    const body = JSON.stringify(authenData)
    return this.httpClient.post(`${this.rootUrl}authen/`, body, { headers: this.headers})
  }

  registerUser(authenData) {
    const body = JSON.stringify(authenData)
    return this.httpClient.post(`${this.rootUrl}api/users/`, body, { headers: this.headers})
  }

  getAuthenHeaders() {
    const token = this.cookieService.get('dynamictoken')
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:  `Token ${token}`
    })
  }
}
