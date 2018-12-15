import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  constructor(private http: HttpClient) { }
  
  getUser() {
    return this.http.get('https://randomuser.me/api?results=5&seed=hola');
  }
}
