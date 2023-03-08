import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { AnswerService } from '../answer.service';
import { Answer } from '../models/answer';
import { UserResponse } from '../models/user-response';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getCurrentUser().subscribe(data => {
      this.user = data;
    });
  }

  @Input() answer: Answer | null = null;
  user: UserResponse | null = null;
}
