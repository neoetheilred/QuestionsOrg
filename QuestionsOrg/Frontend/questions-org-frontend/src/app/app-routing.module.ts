import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAnswerComponent } from './add-answer/add-answer.component';
import { AnswerComponent } from './answer/answer.component';
import { AppComponent } from './app.component';
import { AskComponent } from './ask/ask.component';
import { AuthGuard } from './auth.guard';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: 'full' },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "questions", component: QuestionListComponent, canActivate: [AuthGuard] },
  { path: "ask", component: AskComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "answer/:id", component: AddAnswerComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: "**", component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
