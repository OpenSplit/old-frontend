import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';

import { User } from '../../models/user'
import { Group } from '../../models/group'
import { Expense } from '../../models/expense'
import { Transaction } from '../../models/transaction'

import { environment } from '../../../environments/environment'

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  private BASE_URL: string = environment.apiUrl;
  displayedColumns = ['Groups'];
  user: User = new User()
  newGroup: Group = new Group()
  groups: Group[]
  status: String
  groupInfo: Object[]
  groupToken: String
  expense: Expense = new Expense()
  transactions: Transaction[]
  idSelectedGroup: number
  idSelectedMembers: number[] = []
  groupFormVisible = false
  joinGroupFormVisible = false

  constructor(private api: ApiService) {}

  selectExpenseMember(id): void {
    const index = this.idSelectedMembers.indexOf(id)
    if(index == -1) {
      this.idSelectedMembers.push(id)
    } else {
      this.idSelectedMembers.splice(index, 1);
    }
  }

  selectGroup(id): void {
    this.api.getGroupInfo(id).then((result) => {
      this.idSelectedGroup = id
      this.idSelectedMembers = []
      this.groupInfo = result.json()
      // Sort member by name
      this.groupInfo['member'].sort(function(a,b) {
        var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
        if (nameA < nameB) //sort string ascending
            return -1
        if (nameA > nameB)
            return 1
        return 0 //default return value (no sorting)
      })
      this.getTransactions(id)
      console.log(this.groupInfo)
    }).catch((err) => { console.log(err) })
  }

  getTransactions(id): void {
    this.api.getGroupTransactions(id).then((result) => {
      this.transactions = result.json()[0]
    }).catch((err) => { console.log(err) })
  }

  updateUserInfo(): void {
    this.api.getUserInfo().then((user) => {
      this.user = user.json()
    }).catch((err) => { console.log(err) })
  }

  addGroup(): void {
    this.api.addGroup(this.newGroup).then((result) => {
      this.groupFormVisible = false;
      this.newGroup["name"] = "";
      this.updateUserInfo()
    }).catch((err) => {
      console.log(err)
      this.status = err
    });
  }

  joinGroup(token): void {
    this.api.joinGroup(token).then((result) => {
      this.updateUserInfo()
    }).catch((err) => { console.log(err) })
  }

  addExpense(): void {
    this.expense["paid_by"] = this.user["id"]
    this.expense["split_amongst"] = this.idSelectedMembers
    this.expense["group_id"] = this.idSelectedGroup
    this.api.addExpense(this.expense).then((result) => {
      this.getTransactions(this.idSelectedGroup)
      this.selectGroup(this.idSelectedGroup)
    }).catch((err) => {
      console.log(err)
    });
  }

  ngOnInit(): void {
    this.updateUserInfo()
  }
}
