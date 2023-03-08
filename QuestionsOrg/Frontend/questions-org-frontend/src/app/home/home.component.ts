import { CdkVirtualScrollable } from '@angular/cdk/scrolling';
import { Component, OnInit } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { AccountService } from '../account.service';
import { User } from '../models/user';
import { UserResponse } from '../models/user-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getAll().subscribe(data => {
      this.users = data;
    })
  }

  users: User[] = []
}

