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
  groupInfo: Object[]
  idSelectedGroup: Integer
  idSelectedMembers: Integer[] = []
  groupFormVisible = false

  constructor(private api: ApiService) {}

  selectExpenseMember(id): void {
    const index: Integer = this.idSelectedMembers.indexOf(id)
    if(index == -1) {
      this.idSelectedMembers.push(id)
    } else {
      this.idSelectedMembers.splice(index, 1);
    }
    console.log(this.idSelectedMembers)
  }

  selectGroup(id): void {
    this.api.getGroupInfo(id).then((result) => {
      this.idSelectedGroup = id;
      this.groupInfo = result.json()
    }).catch((err) => { console.log(err) })
  }

  updateUserInfo(): void {
    this.api.getUserInfo().then((user) => {
      this.user = user.json()
    }).catch((err) => { console.log(err) })
  }

  getGroups(): void {
    this.api.getGroups().then((result) => {
      console.log(result.json())
      this.groups = result.json()
    }).catch((err) => { console.log(err) })
  }

  addGroup(): void {
    this.api.addGroup(this.newGroup).then((result) => {
      this.status = 'Group added'
      this.getGroups()
      this.updateUserInfo()
    }).catch((err) => {
      console.log(err)
      this.status = err
    });
  }

  joinGroup(id): void {
    this.api.joinGroup(id).then((result) => {
      this.updateUserInfo()
    }).catch((err) => { console.log(err) })
  }

  ngOnInit(): void {
    this.updateUserInfo()
    this.getGroups()
  }
}
