import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticatedResponse } from './models/authenticated-response';
import { User } from './models/user';
import { UserResponse } from './models/user-response';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getCurrentUser() {
    return this.http.get<UserResponse>("api/account/profile")
  }

  postNewUser(user: User) {
    return this.http.post("api/account/register", user);
  }

  login(user: User) {
    return this.http.post<any>("api/account/login", user).subscribe(data => {
      console.log(data);
      localStorage.setItem('jwt', data.token);
    });
  }

  getAll() {
    return this.http.get<User[]>("api/account/all");
  }

  getById(id: number) {
    return this.http.get<User>("api/account/" + id);
  }
}
