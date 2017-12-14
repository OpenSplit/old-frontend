import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';

import { User } from '../../models/user'

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  user: User = new User()

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getUserInfo().then((user) => {
      this.user = user.json()
    }).catch((err) => {
      console.log(err)
    })
  }
}
