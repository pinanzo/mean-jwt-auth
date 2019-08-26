import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username = 'Anonymous';

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    // this._authService.checkToken()
    //   .subscribe((user) => {
    //     this.username = user.username;
    //   }, (error) => {
    //     this._router.navigateByUrl('login');
    //   });
  }

  onLogoutClick() {
    localStorage.removeItem('token');
    this._router.navigateByUrl('login');
  }

}
