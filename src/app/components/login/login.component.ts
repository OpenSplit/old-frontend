import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';

import { User } from '../../models/user'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User()
  status: String
  token: String = ""

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['token']) {
        this.onToken(params['token'])
      } else {
        console.log('NO TOKEN.')
      }
    })
  }

  onLogin(): void {
    this.auth.login(this.user)
    .then((user) => {
      console.log(user.json());
      this.status = "Mail send, check your email for instructions."
    })
    .catch((err) => {
      console.log(err);
      this.status = "Some error occured!"
    });
  }

  onToken(token: String): void {
    this.auth.tokenLogin(token)
    .then((user) => {
      localStorage.setItem('session_key', user.json().session_key)
      this.router.navigateByUrl('/');
    })
    .catch((err) => {
      console.log(err);
      this.status = "Wrong token!"
    });
  }
}
