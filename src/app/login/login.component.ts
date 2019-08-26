import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  showAlert = false;

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this.showAlert = false;
  }

  onSubmitForm(event, username, password) {
    event.preventDefault();
    const user = { username, password };
    this._authService.login(user)
      .subscribe((token) => {
        localStorage.setItem('token', token);
        this._router.navigateByUrl('');
      }, (error) => {
        this.showAlert = true;
      });
  }
}
