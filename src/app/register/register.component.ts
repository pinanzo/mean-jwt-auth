import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  duplicacyError = false;
  internalServerError = false;

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this.duplicacyError = false;
    this.internalServerError = false;
  }

  onSubmitForm(event, usernameTxt, passwordTxt) {
    event.preventDefault();
    const user = {
      username: usernameTxt.value,
      password: passwordTxt.value,
    };
    this.duplicacyError = false;
    this.internalServerError = false;
    console.log(user);
    this._authService.register(user)
      .subscribe(() => this._router.navigateByUrl('/login'),
      (error) => {
        if (error.error.code === 11000) {
          this.duplicacyError = true;
        } else {
          this.internalServerError = true;
        }
      });
  }
}
