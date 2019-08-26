import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthNegateGuard implements  CanActivate {

  constructor(private _authService: AuthService, private _router: Router) { };

  async canActivate() {
    if (localStorage.getItem('token') !== null ) {
      try {
        await new Promise((resolve, reject) => {
          this._authService.checkToken().subscribe(resolve, reject);
        });
        this._router.navigateByUrl('');
        return false;
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    localStorage.removeItem('token');
    return true;
  }
}
