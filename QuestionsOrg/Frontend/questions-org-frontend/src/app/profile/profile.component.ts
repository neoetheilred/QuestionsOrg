import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatListItemLine, MatListItemTitle } from '@angular/material/list';
import { AccountService } from '../account.service';
import { Question } from '../models/question';
import { UserResponse } from '../models/user-response';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private questionService: QuestionService
  ) { }

  ngOnInit(): void {
    this.accountService.getCurrentUser().subscribe((data) => {
      this.user = data;
      this.questionService.getQuestionsByAuthorId(this.user.id).subscribe(data => {
        this.userQuestions = data;
      })
    })
  }

  user: UserResponse | null = null
  userQuestions: Question[] = []
}

