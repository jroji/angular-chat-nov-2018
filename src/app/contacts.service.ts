import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  constructor(private http: HttpClient) { }
  customUsers = [];

  usedNames = ['Jon', 'Pedro', 'Carlos'];

  getUser() {
    return this.http.get('https://randomuser.me/api?results=5&seed=rtdfyughijk');
  }

  add (user) {
    this.customUsers.push(user);
  }

  validateUser (username) {
    return !this.usedNames.includes(username);
  }
}
