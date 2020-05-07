import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


interface TokenObjectType {
  token: string
}

@Component({
  selector: 'app-authen',
  templateUrl: './authen.component.html',
  styleUrls: ['./authen.component.css']
})
export class AuthenComponent implements OnInit {

  authenForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  newAccount = false

  constructor(private apiService: ApiService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    const DynamicToken = this.cookieService.get('dynamictoken')
    if (DynamicToken) {
      this.router.navigate(['/tasks'])
    }
  }

  saveForm() {
    if (!this.newAccount) {
      this.loginUser()
    } else {
      this.apiService.registerUser(this.authenForm.value).subscribe(
        result => {
          this.loginUser()
        },
        error => console.log(error)
      )
    }
  }

  loginUser() {
    this.apiService.loginUser(this.authenForm.value).subscribe(
      (result: TokenObjectType) => {
        this.cookieService.set('dynamictoken', result.token),
          this.router.navigate(['/tasks'])
      },
      error => console.log(error)
    )
  }

  SubmitButtonDisabled() {
    if (this.authenForm.controls.username.valid && this.authenForm.controls.password.valid) {
      return false
    } else {
      return true
    }
  }

}
