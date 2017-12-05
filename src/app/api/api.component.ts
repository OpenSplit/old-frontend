import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';

import { User } from '../user';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})

export class ApiComponent implements OnInit {

  user: User = {
    id: undefined,
    name: 'Windstorm',
    token: "",
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  registerUser(user: User): void {
    const body = { email: user.name };
    this.http.post('http://localhost:5000/user', body).subscribe(data => {
      user.id = data['userid'];
    });
  }

  getToken(user: User): void {
    this.http.get('http://localhost:5000/login/' + user['id']).subscribe(data => {
      user.token = data;
    });
  }

}
