import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Question } from '../models/question';
import { UserResponse } from '../models/user-response';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private location: Location) { }

  ngOnInit() {
    this.http.get<UserResponse>('api/account/profile').subscribe(data => { this.user = data; })
  }

  submit() {
    this.http.post('api/home', new Question(0, this.title.value!, this.description.value!, new Date(Date.now()), this.user!.id)).subscribe(data => {
      console.log(data);
      this.router.navigate(['questions']);
    })
  }

  back() {
    this.location.back();
  }

  title = new FormControl('');
  description = new FormControl('');
  user: UserResponse | null = null
}

