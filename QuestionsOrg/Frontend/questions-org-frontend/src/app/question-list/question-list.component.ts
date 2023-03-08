import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatList, MatListItem } from '@angular/material/list';
import { MatCard, MatCardHeader, MatCardContent } from '@angular/material/card';
import { Question } from '../models/question';
import { QuestionService } from '../question.service';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { UserResponse } from '../models/user-response';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private questionService: QuestionService,
    private accountService: AccountService,
    private router: Router) { }

  @Input() showUserQuestionsOnly: Boolean = false;
  @Input() expanded: Boolean = true;
  user: UserResponse | null = null;
  list: Question[] = [];

  ngOnInit(): void {
    this.accountService.getCurrentUser().subscribe(data => {
      this.user = data;
      this.getQuestions();
    });
  }

  getUsernames() {
    if (this.showUserQuestionsOnly) {
      this.list.forEach(x => { x.username = this.user!.name });
      return;
    }
    for (let q of this.list) {
      this.accountService.getById(q.authorId).subscribe(data => {
        q.username = data.name;
      })
    }
  }

  getQuestions() {
    if (this.showUserQuestionsOnly) {
      this.questionService.getQuestionsByAuthorId(this.user!.id).subscribe(data => {
        this.list = data;
        this.getUsernames();
      });
    } else {
      this.questionService.getQuestions().subscribe((data: Question[]) => {
        this.list = data;
        this.getUsernames();
      });
    }
  }

  deleteQuestion(id: number) {
    this.questionService.deleteQuestion(id).subscribe(data => {
      this.getQuestions();
    });
  }

}
