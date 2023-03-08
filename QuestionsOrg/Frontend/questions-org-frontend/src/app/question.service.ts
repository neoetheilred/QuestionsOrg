import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from './models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getQuestions() {
    return this.http.get<Question[]>("api/home");
  }

  getQuestionById(id: number) {
    return this.http.get<Question>("api/home/" + id);
  }

  deleteQuestion(id: number) {
    return this.http.delete("api/home/" + id);
  }

  getQuestionsByAuthorId(authorId: number) {
    return this.http.get<Question[]>("api/home/author/" + authorId);
  }
}
