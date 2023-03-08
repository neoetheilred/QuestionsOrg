import { Component, Input, OnInit } from '@angular/core';
import { AnswerService } from '../answer.service';
import { Answer } from '../models/answer';
import { Question } from '../models/question';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent implements OnInit {
  constructor(private answerService: AnswerService) { }

  ngOnInit() {
    this.getAnswers();
  }

  getAnswers() {
    this.answerService.getAnswerByQuestionId(this.question!.id!).subscribe(data => {
      this.answers = data;
    });
  }

  @Input() question: Question | null = null;
  answers: Answer[] = [];
  
}
