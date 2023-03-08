import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import { AnswerService } from '../answer.service';
import { Answer } from '../models/answer';
import { Question } from '../models/question';
import { UserResponse } from '../models/user-response';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.css']
})
export class AddAnswerComponent implements OnInit {
  constructor(
    private answerService: AnswerService,
    private accountService: AccountService,
    private location: Location,
    private questionService: QuestionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.accountService.getCurrentUser().subscribe(data => {
      this.user = data;
      this.questionId = Number(this.route.snapshot.paramMap.get('id'));
      this.questionService.getQuestionById(this.questionId).subscribe(data => {
        this.question = data;
      })
    });
  }

  questionId: number | null = null
  question: Question | null = null;
  user: UserResponse | null = null
  text = new FormControl('');

  back() {
    this.location.back();
  }
  submit() {
    this.answerService.postAnswer(new Answer(0, this.text.value!, this.user!.id, this.question!.id!)).subscribe(_ => {
      this.back();
    });
  }
}
