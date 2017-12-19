import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';

import { User } from '../../models/user'
import { Group } from '../../models/group'

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  displayedColumns = ['Groups'];
  user: User = new User()
  newGroup: Group = new Group()
  groups: Group[]
  status: String
  groupFormVisible = false

  constructor(private api: ApiService) {}

  updateUserInfo(): void {
    this.api.getUserInfo().then((user) => {
      this.user = user.json()
    }).catch((err) => {
      console.log(err)
    })
  }

  getGroups(): void {
    this.api.getGroups()
    .then((result) => {
      console.log(result.json())
      this.groups = result.json()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  addGroup(): void {
    this.api.addGroup(this.newGroup)
    .then((result) => {
      console.log(result.json())
      this.status = 'Group added'
      this.getGroups()
    })
    .catch((err) => {
      console.log(err)
      this.status = err
    });
  }

  joinGroup(groupName): void {
    this.api.joinGroup(groupName)
    .then((result) => {
      this.updateUserInfo()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  ngOnInit(): void {
    this.updateUserInfo();
    this.getGroups()
  }
}
