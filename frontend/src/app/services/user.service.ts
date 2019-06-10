
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as AppUtil from '../common/app.util';

@Injectable()
export class UserService {

  constructor(private _http:Http) { }

  createAccount(user) {
    return this._http.post('users/register', user)
      .map(resp => resp.json());
  }

  auth(user) {
    return this._http.post('users/login', user)
      .map(resp => resp.json());
  }

  saveUserDate(token, user) {
    localStorage.setItem(AppUtil.AUTH_TOKEN, token);
    localStorage.setItem(AppUtil.USER_INFO, JSON.stringify(user));
  }

  isLoggedIn() :boolean {
    return !!localStorage.getItem(AppUtil.AUTH_TOKEN);
  }

  logOut() {
    localStorage.removeItem(AppUtil.AUTH_TOKEN);
    localStorage.removeItem(AppUtil.USER_INFO);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem(AppUtil.USER_INFO));
  }
}
