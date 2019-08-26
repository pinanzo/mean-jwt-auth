import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {

  constructor(private _authService: AuthService, private _router: Router) { };

  async canActivate() {
    if (localStorage.getItem('token') !== null ) {
      try {
        await new Promise((resolve, reject) => {
          this._authService.checkToken().subscribe(resolve, reject);
        });
        return true;
      } catch (error) {
        localStorage.removeItem('token');
        this._router.navigateByUrl('login');
      }
    }
    localStorage.removeItem('token');
    this._router.navigateByUrl('login');
    return false;
  }
}
