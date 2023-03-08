import { Component, OnInit } from '@angular/core';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { QuestionListComponent } from './question-list/question-list.component';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatGridList } from '@angular/material/grid-list';
import { Router, RouterOutlet } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Location, NgTemplateOutlet } from '@angular/common';
import { CdkContextMenuTrigger, CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { AccountService } from './account.service';
import { UserResponse } from './models/user-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Questions.ORG';

  constructor(private router: Router, private location: Location) { }

  back() {
    this.location.back();
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(["login"]);
  }

  isAuthenticated() {
    return localStorage.getItem('jwt') != null;
  }
}


