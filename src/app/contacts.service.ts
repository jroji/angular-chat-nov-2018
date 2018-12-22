import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  constructor(private http: HttpClient) { }
  customUsers = []
  getUser() {
    return this.http.get('https://randomuser.me/api?results=5&seed=rtdfyughijk');
  }

  add (user) {
    this.customUsers.push( { name: { first: user.name, last: user.lastname }, image: { large: user.image || '' }});
  }
}
