import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messages = {};
  messages$ = new Subject();

  constructor(private firebase: AngularFirestore) { }

  saveMessage(message, name) {
    this.firebase.collection('messages').add(message);
    // if (!this.messages[name]) { this.messages[name] = []; }
    // this.messages[name].push(message);
    // this.messages$.next(this.messages[name]);
  }

  getMessages (name) {
    return this.messages[name];
  }
}
