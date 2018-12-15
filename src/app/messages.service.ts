import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messages = {};
  messages$ = new Subject();

  constructor() { }

  saveMessage(message, name) {
    if (!this.messages[name]) { this.messages[name] = []; }
    this.messages[name].push(message);
    this.messages$.next(this.messages[name]);
  }

  getMessages (name) {
    return this.messages[name];
  }
}
