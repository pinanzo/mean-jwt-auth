import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  
  constructor(private authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this._router.navigateByUrl('');
    }
  }

  onRegisterClick(usernameTxt, passwordTxt) {
    const user = {
      username: usernameTxt.value,
      password: passwordTxt.value,
    };
    if (user.username.trim() === '') {
      alert('User Name can\'t be empty');
    } else if (user.password.trim() === ''){
      alert('Password can\'t be empty');
    } else {
      this.authService.register(user)
        .subscribe(data => {
          console.log(data);
          this._router.navigateByUrl('/login');
        });
    }
  }

}
