import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user as userAPI } from '../config/api-list.js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  register(user) {
    return this._http.post<any>(userAPI.register, user);
  }

  login(user) {
    return this._http.post<any>(userAPI.login, user);
  }

  checkToken() {
    const token = localStorage.getItem('token') || null;
    return this._http.post<any>(userAPI.checkToken, {token});
  }
}
