import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { User } from '../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = new FormControl('');
  password = new FormControl('');

  invalidLogin: boolean = true

  constructor(private http: HttpClient, private router: Router, private accountService: AccountService) { }

  submit() {
    const user = new User(0, this.username.value!, this.password.value!);
    this.accountService.login(user);
    this.router.navigate([''])
  }
}
