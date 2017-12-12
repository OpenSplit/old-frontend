import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Opensplit';
  isLoggedIn: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    const session_key = localStorage.getItem('session_key');
    if (session_key) {
      this.auth.ensureAuthenticated(session_key)
      .then((user) => {
        console.log(user.json());
        if (user.json().status === 'success') {
          this.isLoggedIn = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
}
