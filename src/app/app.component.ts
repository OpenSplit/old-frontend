import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { User } from './models/user'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Opensplit';
  user: User = new User()
  isLoggedIn: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    const session_key = localStorage.getItem('session_key')
    if (session_key) {
      this.auth.ensureAuthenticated(session_key)
      .then((user) => {
        if (user.json().status === 'success') {
          this.isLoggedIn = true;
        }
      })
      .catch((err) => {
        console.log(err)
      });
    }
  }

  logout(): void {
    localStorage.removeItem('session_key')
    this.router.navigate(['/login']);
    this.isLoggedIn = false;
  }
}
