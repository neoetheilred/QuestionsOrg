import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatFormFieldControl, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { AccountService } from '../account.service';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private http: HttpClient, private accountService: AccountService) {

  }

  username = new FormControl('');
  password = new FormControl('');
  confirmPassword = new FormControl('');

  submit() {
    if (this.username.value != '' && this.password.value != '' && this.password.value == this.confirmPassword.value) {
      let newUser = new User(0, this.username.value!, this.password.value!);
      this.accountService.postNewUser(newUser).subscribe();
    }
  }
}

