import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnswerService } from '../answer.service';
import { Answer } from '../models/answer';
import { Question } from '../models/question';
import { User } from '../models/user';
import { UserResponse } from '../models/user-response';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question | null = null;
  @Input() user: UserResponse | null = null;
  @Input() expanded: Boolean = true;
  showAnswers: boolean = false

  @Output() onDelete = new EventEmitter();

  constructor(private answerService: AnswerService) { }

  ngOnInit() {
    this.answerService.getAnswerByQuestionId(this.question!.id!).subscribe(data => {
      this.answers = data;
    });
  }



  answers: Answer[] = [];
}
