import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Answer } from './models/answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) { }

  getAnswerByQuestionId(id: number) {
    return this.http.get<Answer[]>("api/answers/question/" + id);
  }

  postAnswer(answer: Answer) {
    return this.http.post("api/answers", answer);
  }
}
