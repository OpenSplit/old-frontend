import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';

import { User } from '../../models/user'
import { Group } from '../../models/group'
import { Expense } from '../../models/expense'
import { Transaction } from '../../models/transaction'

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
  expense: Expense = new Expense()
  transactions: Transaction[]
  idSelectedGroup: number
  idSelectedMembers: number[] = []
  groupFormVisible = false

  constructor(private api: ApiService) {}

  selectExpenseMember(id): void {
    const index = this.idSelectedMembers.indexOf(id)
    if(index == -1) {
      this.idSelectedMembers.push(id)
    } else {
      this.idSelectedMembers.splice(index, 1);
    }
    console.log(this.idSelectedMembers)
  }

  selectGroup(id): void {
    this.api.getGroupInfo(id).then((result) => {
      this.idSelectedGroup = id
      this.idSelectedMembers = []
      this.groupInfo = result.json()
      this.getTransactions(id)
      console.log(this.groupInfo)
    }).catch((err) => { console.log(err) })
  }

  getTransactions(id): void {
    this.api.getGroupTransactions(id).then((result) => {
      this.transactions = result.json()[0]
      console.log(this.transactions)
    }).catch((err) => { console.log(err) })
  }

  updateUserInfo(): void {
    this.api.getUserInfo().then((user) => {
      this.user = user.json()
    }).catch((err) => { console.log(err) })
  }

  getGroups(): void {
    this.api.getGroups().then((result) => {
      this.groups = result.json()
    }).catch((err) => { console.log(err) })
  }

  addGroup(): void {
    this.api.addGroup(this.newGroup).then((result) => {
      this.groupFormVisible = false;
      this.newGroup["name"] = "";
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

  addExpense(): void {
    this.expense["paid_by"] = this.user["id"]
    this.expense["split_amongst"] = this.idSelectedMembers
    this.expense["group_id"] = this.idSelectedGroup
    this.api.addExpense(this.expense).then((result) => {
      console.log("Expense Added")
    }).catch((err) => {
      console.log(err)
    });
  }

  ngOnInit(): void {
    this.updateUserInfo()
    this.getGroups()
  }
}
